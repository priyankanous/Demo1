#include "EventManager.h"

using namespace std;

EventManager::EventManager(vector<FSM_struct> & FSMArray)
  :encoder(FSMArray)
{
  //Iterate through each FSM
	for(int i=0; i<FSMArray.size(); i++)
	{
	  //Iterate through each event in one FSM
		for(int j=0; j<FSMArray[i].numEvents; j++)
		{
		  string eventName = FSMArray[i].alphabet[j];
		  
		  //Look for event name in frequency map
			map<string, int>::iterator it = EventFrequency.find(eventName);
			
			//If not found, add it to the map
			if (it == EventFrequency.end())
			{
				EventFrequency.insert( make_pair(eventName, 1) );
			}
			else
			{
			  //Otherwise, increment the frequency
				(*it).second += 1;	
			}		
		}
	}
}


void EventManager::AddTransitions(State & state, int fsmIndex)
{
  //Iterate through all transitions in state
  const int numberOfTransitions = state.transitions.size();
  for(int i=0; i < numberOfTransitions; i++)
  {
    //Find event entry
    const Trans NewTransition = state.transitions[i];
    map<string, Event>::iterator it = EventsAtCurrentState.find(NewTransition.event);
    
    //Add event entry with new instance
    if( it == EventsAtCurrentState.end() )
    {
      Event NewEvent;
      NewEvent.transitions.push_back(make_pair(fsmIndex, NewTransition.dest));
      NewEvent.UniqueFSMcount = 1;
      EventsAtCurrentState.insert(make_pair(NewTransition.event, NewEvent));
    }
    
    //Update entry with new instance
    else
    {
      //Check for duplicate events in same state
      if( (*it).second.transitions.back().first != fsmIndex )
      {
        (*it).second.UniqueFSMcount += 1;
      }
      
      (*it).second.transitions.push_back(make_pair(fsmIndex, NewTransition.dest));
    }
  }
}

void EventManager::GetNextStates( vector<unsigned int> & nextStates, unsigned int currentState )
{
  //Iterate through each event, determining the transitions that must be added
  map<string, Event>::iterator it; 
  for(it = EventsAtCurrentState.begin(); it != EventsAtCurrentState.end(); it++)
  {
    //If number of unique FSMs for an event does not match the master map,
    //the transition is not valid
    int MasterFrequency = EventFrequency.find((*it).first)->second;
    if( MasterFrequency != (*it).second.UniqueFSMcount)
    {
      continue;
    }
    
    //We know that the FSM frequency numbers match
    //If the number of transitions matches the number of unique FSMs,
    //then we have no duplicate events (DFA case)
    else if( (*it).second.UniqueFSMcount == (*it).second.transitions.size() )
    {
      unsigned int newState = encoder.UpdateStateWithTransitions( currentState, (*it).second.transitions );
			nextStates.push_back(newState);    
    }
    
    //In this case, the event has multiple instances, 
    //each leading to different state in the same fsm.
    //Need to generate all composite permuations (NDFA)
    else
    {
      /* ~~~~~~~~~~~~~~~~ Create Instances Vector ~~~~~~~~~~~~~~~~~~~~ /
       * Generate a vector which contains the number of instances 
       * of this event in each fsm (at this composite state).
       * For example, if the following set of <fsm, destination> pairs exists for a given event:
       *    Event: event1 
       *    Instances:  <fsm1, state1.3>
       *                <fsm1, state1.4>
       *                <fsm3, state3.5>
       *                <fsm3, state3.4>
       *                <fsm3, state3.1>
       *                <fsm4, state4.1>
       *                <fsm4, state4.2>
       *                <fsm7, state7.4>
       * The instances vector generated would be: {2, 3, 2, 1}
       */ 
      vector<int> instances;
			int fsmIndex = (*it).second.transitions[0].first;
			int tempFsmCount = 1; //=0
			for(int i=0; i<(*it).second.transitions.size(); i++)
			{
				if( (*it).second.transitions[i].first == fsmIndex )
				{
				  //Increment FSMcount for this FSM
					tempFsmCount++;
			  }
				else
				{
				  //Push last count on instances and access next instance
					instances.push_back(tempFsmCount);
					fsmIndex = (*it).second.transitions[i].first;
					tempFsmCount = 1;
				}
			}
			instances.push_back(tempFsmCount);
			/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
			
			
			/* ~~~~~~ Create vector to store current permutation ~~~~~ */		
			//Intialize vector of length N to {0, 0, 0, 0 ..., -1}
			vector<int> currentPermutation( (*it).second.UniqueFSMcount - 1, 0 );
			currentPermutation.push_back( -1 );
			/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */	
			
				
			/* ~ Iterate through all permutations of event instances ~ */
			int lastIndex = (*it).second.UniqueFSMcount - 1;
			while( GetNextPermutation(currentPermutation, instances, lastIndex) )
			{
				Event temporaryEvent;
				int runningSum = 0;
				for(int i=0; i<instances.size(); i++)
				{
				  int localIndex = runningSum + currentPermutation[i];
					temporaryEvent.transitions.push_back( (*it).second.transitions[localIndex] );
					runningSum += instances[i];
				}
						
        unsigned int newState = encoder.UpdateStateWithTransitions( currentState, temporaryEvent.transitions );
			  nextStates.push_back(newState); 
			}
			/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    }
  }
  EventsAtCurrentState.clear();
}


bool EventManager::GetNextPermutation( vector<int> & currentPermutation, const vector<int> & instances, int fsmIndex )
{
	//Base case
	if (fsmIndex == -1)
		return false;
		
	//Increment currentPermuation
	if( (currentPermutation[fsmIndex] + 1) >= instances[fsmIndex] )
	{
		currentPermutation[fsmIndex] = 0;
		return GetNextPermutation(currentPermutation, instances, fsmIndex-1);
	}
	//Completely iterate through level
	else
		currentPermutation[fsmIndex]++;
		
	return true;
}















































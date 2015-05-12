// #include "EventManager.h"
// 
// using namespace std;
// 
// const char * EventTypeNamesArray[16] = {  
//   "NO_EVENTS_MASK",//   = 0x0,  
//   "VARIABLE_EVENT",//   = 0x1,
//   "EXOGENOUS_EVENT",//  = 0x2,
//   "EXO_AND_VAR_MASK",// = 0x3,
//   "DC_EVENT",//        = 0x4,
//   "DC_AND_VAR_MASK",// = 0x5,
//   "DC_AND_EXO_MASK",//  = 0x6,
//   "NOT_DDC_MASK",//    = 0x7;
//   "DDC_EVENT",//       = 0x8,
//   "DDC_AND_VAR_MASK",// = 0x9,
//   "DDC_AND_EXO_MASK",// = 0xA,
//   "NOT_DC_MASK",//     = 0xB,
//   "DC_AND_DDC_MASK",// = 0xC,
//   "NOT_EXO_MASK",//    = 0xD,
//   "NOT_VAR_MASK",//   = 0xE,
//   "ALL_EVENTS_MASK"// = 0xF
// };
// 
// 
// EventManager::EventManager(const vector<FSM_struct> & FSMArray)
//   :encoder(FSMArray)
// {
//   //Iterate through each FSM
// 	for(int i=0; i<FSMArray.size(); i++)
// 	{
// 	  //Iterate through each event in one FSM
// 		for(int j=0; j<FSMArray[i].numEvents; j++)
// 		{
// 		  string eventName = FSMArray[i].alphabet[j];
// 		  
// 		  EventTypeMask mask = AssignEventMask(eventName);
// 		  
// 		  //Look for event name in frequency map
// 			map<string, int>::iterator it = EventFrequency.find(eventName);
// 			
// 			//If not found, add it to the map
// 			if (it == EventFrequency.end())
// 			{
// 				EventFrequency.insert( make_pair(eventName, 1) );
// 				EventTypeMap.insert( make_pair(eventName, mask) );
// 			}
// 			else
// 			{
// 			  //Otherwise, increment the frequency
// 				(*it).second += 1;	
// 			}		
// 		}
// 	}
// 	
// 	/* This prints the events and their type.
// 	cout << "~~~~~~" << endl << "Events" << endl << "~~~~~~~~" << endl;
// 	
// 	for(map<string, EventTypeMask>::iterator it = EventTypeMap.begin(); it != EventTypeMap.end(); it++ )
// 	{
// 	  cout << (*it).first << "\t" << EventTypeNamesArray[(*it).second] << endl;
// 	}*/
// 	
// }
// 
// EventTypeMask EventManager::AssignEventMask(const string & eventString)
// {
//   const char * event = eventString.c_str();
//   
//   if( !eventString.compare("DC") )
//   {
//     return DC_EVENT;  
//   }
//   else if( !eventString.compare("DDC") )
//   {
//     return DDC_EVENT;  
//   } 
//   else
//   {
//     for(int i=0; i < eventString.length(); i++)
//     {
//       if( !islower( event[i] ) && !isdigit( event[i] ) && event[i] != '_' )
//       {
//         return EXOGENOUS_EVENT;
//       }
//     }
//     
//     return VARIABLE_EVENT;
//   }
// }
// 
// 
// /*
//  * @brief Return the event mask stored for a given event
//  *        Exits if event not found
//  * @return EventTypeMask of given event
//  */ 
// EventTypeMask EventManager::GetEventMask(const string & eventString)
// {
//   map<string, EventTypeMask>::iterator it = EventTypeMap.find(eventString);
//   if( it != EventTypeMap.end() )
//   {
//     return EventTypeMap.find(eventString)->second;
//   }
//   cerr << "Requested event: " << eventString << " not found in event map. Exiting."<< endl;
//   exit(1);
// }
// 
// 
// void EventManager::AddTransitions(const State & state, int fsmIndex, EventTypeMask restriction)
// {
//   //Iterate through all transitions in state
//   const int numberOfTransitions = state.transitions.size();
//   for(int i=0; i < numberOfTransitions; i++)
//   {
//     //Find event entry
//     const Trans NewTransition = state.transitions[i];
//     
//     //Compare restriction to event's mask, don't add irrelevant events
//     map<string, EventTypeMask>::iterator it1 = EventTypeMap.find( NewTransition.event );
//   
//     //Do not consider events which don't match restriction
//     if( !(restriction & (*it1).second) )
//     {
//       continue;
//     }
// 
//     //Find event reference
//     map<string, Event>::iterator it = EventsAtCurrentState.find( NewTransition.event );
//     
//     //Add event entry with new instance
//     if( it == EventsAtCurrentState.end() )
//     {
//       Event NewEvent;
//       NewEvent.transitions.push_back(make_pair(fsmIndex, NewTransition.dest));
//       NewEvent.UniqueFSMcount = 1;
//       EventsAtCurrentState.insert(make_pair(NewTransition.event, NewEvent));
//     }
//     
//     //Update entry with new instance
//     else
//     {
//       //Check for duplicate events in same state
//       if( (*it).second.transitions.back().first != fsmIndex )
//       {
//         (*it).second.UniqueFSMcount += 1;
//       }
//       
//       (*it).second.transitions.push_back(make_pair(fsmIndex, NewTransition.dest));
//     }
//   }
// }
// 
// void EventManager::GetNextStates( EncodedStateType currentState, std::vector<CompositeTransition> & nextStates )
// {
//   //Iterate through each event, determining the transitions that must be added
//   map<string, Event>::iterator it; 
//   int countR =0;
//   for(it = EventsAtCurrentState.begin(); it != EventsAtCurrentState.end(); it++)
//   {
//     //If number of unique FSMs for an event does not match the master map,
//     //the transition is not valid
//     int MasterFrequency = EventFrequency.find((*it).first)->second;
//     if( MasterFrequency != (*it).second.UniqueFSMcount)
//     {
//       continue;
//     }
//   
//     //We know that the FSM frequency numbers match
//     //If the number of transitions matches the number of unique FSMs,
//     //then we have no duplicate events (DFA case)
//     else if( (*it).second.UniqueFSMcount == (*it).second.transitions.size() )
//     {
//       EncodedStateType newState = encoder.UpdateStateWithTransitions( currentState, (*it).second.transitions );
// 			nextStates.push_back( CompositeTransition(it->first, newState) );    
//     }
//     
//     //In this case, the event has multiple instances, 
//     //each leading to different state in the same fsm.
//     //Need to generate all composite permuations (NDFA)
//     else
//     {
//       /* ~~~~~~~~~~~~~~~~ Create Instances Vector ~~~~~~~~~~~~~~~~~~~~ /
//        * Generate a vector which contains the number of instances 
//        * of this event in each fsm (at this composite state).
//        * For example, if the following set of <fsm, destination> pairs exists for a given event:
//        *    Event: event1 
//        *    Instances:  <fsmID, destination_state>
//        *                <fsm1, state1.3>
//        *                <fsm1, state1.4>
//        *                <fsm3, state3.5>
//        *                <fsm3, state3.4>
//        *                <fsm3, state3.1>
//        *                <fsm4, state4.1>
//        *                <fsm4, state4.2>
//        *                <fsm7, state7.4>
//        * The instances vector generated would be: {2, 3, 2, 1}
//        */
//       
//       //Prevent poorly-formed data from throwing segfault 
//       if( (*it).second.transitions.size() < 1)
//       {
//         cerr << "WARNING: No transitions stored for event "<<(*it).first<<" at state "<<currentState<<endl;
//         continue;
//       }  
// 
//       vector<int> instances;
// 			int fsmIndex = (*it).second.transitions[0].first;
// 			int tempFsmCount = 1;
// 			for(int i=1; i<(*it).second.transitions.size(); i++)
// 			{
// 				if( (*it).second.transitions[i].first == fsmIndex )
// 				{
// 				  //Increment FSMcount for this FSM
// 					tempFsmCount++;
// 			  }
// 				else
// 				{
// 				  //Push last count on instances and access next instance
// 					instances.push_back(tempFsmCount);
// 					fsmIndex = (*it).second.transitions[i].first;
// 					tempFsmCount = 1;
// 				}
// 			}
// 			instances.push_back(tempFsmCount);
// 			/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */	
// 			
// 			
// 			/* ~~~~~~ Create vector to store current permutation ~~~~~ */		
// 			//Intialize vector of length N to {0, 0, 0, 0 ..., -1}
// 			//  Where N is the number of unique FSMs which have valid
// 			//  transitions at this composite state
// 			//
// 			vector<int> currentPermutation( (*it).second.UniqueFSMcount - 1, 0 );
// 			currentPermutation.push_back( -1 );
// 			/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */	
// 
// 			/* ~ Iterate through all permutations of event instances ~ */
// 			int lastIndex = (*it).second.UniqueFSMcount - 1;
// 			while( GetNextPermutation(currentPermutation, instances, lastIndex) )
// 			{
// 				Event temporaryEvent;
// 				int runningSum = 0;
// 				for(int i=0; i<instances.size(); i++)
// 				{
// 				  int localIndex = runningSum + currentPermutation[i];
// 
// 					temporaryEvent.transitions.push_back( (*it).second.transitions[localIndex] );
// 					runningSum += instances[i];
// 				}
// 				
//         EncodedStateType newState = encoder.UpdateStateWithTransitions( currentState, temporaryEvent.transitions );
// 			  nextStates.push_back( CompositeTransition(it->first,newState) ); 
// 			}
// 			/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//     }
//   }
//   
// /**** Visual Output **********
// cout << "//\n//\nCurrent State: " << currentState << endl;
// cout << "Transitions: "<<endl;
// for(int i=0; i<nextStates.size(); i++)
// {
//   cout << "\t" << nextStates[i].second << "\t" << nextStates[i].first <<"\t";
//   cout << "Event shared by " << EventsAtCurrentState[nextStates[i].second].UniqueFSMcount << " unique FSM\'s" <<endl;
// }
// cout << "//\n//"<<endl;
// char in; cin>>in;
// /*****************************/
// 
// 
//   EventsAtCurrentState.clear();
// }
// 
// 
// bool EventManager::GetNextPermutation( vector<int> & currentPermutation, const vector<int> & instances, int fsmIndex )
// {
// 	//Base case
// 	if (fsmIndex == -1)
// 		return false;
// 	
// 	/*** Catch Seg Fault ****
// 	if( (fsmIndex	>= instances.size()) || (fsmIndex >= currentPermutation.size()) || (fsmIndex < 0) )
// 	{
// 	  cout << "SEG FAULT! fsmIndex = "<<fsmIndex << " instances.size = "<<instances.size() << endl;
// 	  exit(1);
// 	}
// 	************************/
// 	
// 	//Increment currentPermuation
// 	if( (currentPermutation[fsmIndex] + 1) >= instances[fsmIndex] )
// 	{
// 		currentPermutation[fsmIndex] = 0;
// 		return GetNextPermutation(currentPermutation, instances, fsmIndex-1);
// 	}
// 	//Completely iterate through level
// 	else
// 		currentPermutation[fsmIndex]++;
// 		
// 	return true;
// }
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

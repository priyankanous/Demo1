#include "StateEncoder.h"

using namespace std;

StateEncoder::StateEncoder( const vector<FSM_struct> & FSMArray )
{
  /* Resize all vectors to have proper size */
  int numberOfStateMachines = FSMArray.size();
  numbits.resize(numberOfStateMachines);
  offset.resize(numberOfStateMachines);

  /* Populate parameter vectors */ 
	for( int i=(numberOfStateMachines - 1); i>=0; i-- )
	{
	  if( i == (numberOfStateMachines - 1) )
	  {
	    offset[i] = 0;
	  }
	  else
	  {
	    offset[i] = offset[i+1] + numbits[i+1];
	  }
		
		numbits[i] = ceil(log2(FSMArray[i].GetNumberOfStates()));		
	}	
	
	//Load up stateNames index and marked status
	for(int i=0; i<FSMArray.size(); i++)
	{
	  vector<pair<string, bool> > stateNamesRow;
	  for(int j=0; j<FSMArray[i].GetNumberOfStates(); j++)
	  {
	     stateNamesRow.push_back( make_pair(FSMArray[i].states[j].stateName, FSMArray[i].states[j].marked) );
	  }
	  
	  stateNames.push_back(stateNamesRow);
	}
}


EncodedStateType StateEncoder::StatesToEncodedValue( std::vector<int> & states )
{
  //Value to be returned
  unsigned int encodedValue = 0;
  
  for(int i=0; i<states.size(); i++)
  {
    encodedValue |= (states[i] << offset[i]);
  }
  
  return encodedValue;
}

EncodedStateType StateEncoder::UpdateStateWithTransitions( EncodedStateType currentState, std::vector< pair<int, int> > transitionList)
{
  //Update state encoding mask
  EncodedStateType newState = currentState;
  
  //Iterate through transitions, modifying mask
	for(int i=0; i<transitionList.size(); i++)
	{		
	
	  int fsmIndex = transitionList[i].first;
		int destinationState = transitionList[i].second;
		
		EncodedStateType mask = ( ((1<<numbits[fsmIndex])-1) << offset[fsmIndex] );
    EncodedStateType newbits = destinationState << offset[fsmIndex];
    
		newState = (~mask & newState) | (mask & newbits);
	} 
	
	return newState;
}



int StateEncoder::FindStateIndex( EncodedStateType currentState, int fsmIndex)
{
  return (currentState>>offset[fsmIndex])&((1<<numbits[fsmIndex])-1);
}




string StateEncoder::GenerateStateName( EncodedStateType currentState )
{
  stringstream ss;
  int stateIndex;
  
  //Separate state names by commas
  for(int i=0; i<numbits.size(); i++)
  {
    stateIndex = FindStateIndex(currentState, i);
    ss << stateNames[i][stateIndex].first << ",";
  }
  
  string compositeName = ss.str();
  
  //Remove final comma
  if(numbits.size() > 0)
  {
    compositeName.erase(compositeName.end()-1);
  }
  
  return compositeName; 
}



bool StateEncoder::CheckForUnmarkedStates(EncodedStateType currentState)
{
  int stateIndex;

  //Get marked status
  for(int i=0; i<numbits.size(); i++)
  {
    stateIndex = FindStateIndex(currentState, i);

    if( !(stateNames[i][stateIndex].second) )
    {
      return true;
    }
  }

  return false;
}






















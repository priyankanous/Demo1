
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
#include <stdlib.h>


#include "FSMDataStructures.h"
#include "MemoryManager.h"
#include "EventManager.h"
#include "StateEncoder.h"

#include "HeuristicUtilities.h"
#include "IO_Utilities.h"
#include "ParCompUtilities.h"

using namespace std;

int main(int argc, char * argv[])
{ 
	//Declare vector of FSM_structs
	vector<FSM_struct> FSMArray;
	
	//Read in .fsm files
	//Change second parameter to "0" to not print update
	IO_Utilities::readFSM(FSMArray, 0, argc, argv);
	
  //Calculate the worst case state space (full cross product)
	unsigned long int totalStateSpace = GetUpperBoundStateSpace(FSMArray);
	cout << "Number of states: " << totalStateSpace << endl;
	
	//Calculate number of bits needed to encode the state spac
	int totalNumBits = GetNumberOfBitsToEncodeUncompressed(FSMArray);
	cout << "Bits currently needed to encode: " << totalNumBits << endl;
  
	
	while( totalStateSpace > 0xFFFFFFFF)
	{
    pair<int, int> nextFSMs = MapCommonEvents(FSMArray, WORSTCASE_NUMBER_OF_STATES, 0);
    
    totalStateSpace = GetUpperBoundStateSpace(FSMArray);
    totalNumBits = GetNumberOfBitsToEncodeUncompressed(FSMArray);        
    cout << "Bits currently needed to encode: " << totalNumBits << endl;
    cout << "Number of states: " << totalStateSpace << endl;
    
    if(nextFSMs.first == -1 || nextFSMs.second == -1)
    {
      cout << "Application was not able to reduce FSM's sufficiently." << endl;
      exit(1);
    }
    else
    {
      cout << FSMArray[nextFSMs.first].fsmName << " and " << FSMArray[nextFSMs.second].fsmName;
      cout << " will be composed." << endl; 
    }
    
    vector<FSM_struct> tempArray;
    tempArray.push_back(FSMArray[nextFSMs.first]);
    tempArray.push_back(FSMArray[nextFSMs.second]);

    FSM_struct fsm;
    unsigned int totalStatesAccessed = FullParCompWithOutput(tempArray, "", &fsm);
       
    FSMArray.erase(FSMArray.begin()+ max(nextFSMs.first, nextFSMs.second));
    FSMArray.erase(FSMArray.begin()+ min(nextFSMs.first, nextFSMs.second));
    
    FSMArray.push_back(fsm);
    
  }
  
  cout << "State space is now sufficently small to perform on-the-fly composition." << endl;
  cout << "Starting ON-THE-FLY parcomp with "<< FSMArray.size() << " remaining FSMs" << endl;
  unsigned int totalBlockingStatesFound = OnTheFlyParComp(FSMArray);
  cout << "PARCOMP complete. " << totalBlockingStatesFound << " blocking states found." << endl;
  
  return 0;
}






	
		
		
		
		
		
	
	
	
	
	

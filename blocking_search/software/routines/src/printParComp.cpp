
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
	int worstcase = readFSM(FSMArray, 0, argc, argv);
	

	bool printFlag = true;
	while(1)
	{
    pair<int, int> nextFSMs = MapCommonEvents(FSMArray, WORSTCASE_NUMBER_OF_STATES, printFlag);
    printFlag = false;
    
    unsigned long int stateSpace = GetUpperBoundStateSpace(FSMArray);
    cout <<"GB currently needed: "<< (stateSpace >> 30) << endl;
    
    if((nextFSMs.first == -1) || ((stateSpace>>30) < 4) )
    {
      cout << "Memory is now sufficent to perform on-the-fly composition." << endl;
      break;
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
  
  //Temp output 
  FullParCompWithOutput(FSMArray, "./", NULL);
  
  return 0;
}




	
		
		
		
		
		
	
	
	
	
	

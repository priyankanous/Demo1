
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
//   //Declare vector of FSM_structs
//   vector<FSM_struct> FSMArray;
//   
//   //Loop through inputs, reading .fsm files into vector
//   //Each successive call will append one FSM to vector
//   for(int filenum=1; filenum<argc; filenum++)
//   {
//     //Get filepath of .fsm file
//     string filePath(argv[filenum]);
//     
//     //Read in file and error check
//     FSM_struct FSM;
//     if( false == IO_Utilities::ReadFsmFileIntoStruct(FSM, filePath) )
//     {
//       cout << "main: Encountered an error when reading in " << filePath << ". Exiting application." << endl;
//       return 1;
//     }
//     
//     //Append new FSM to array
//     FSMArray.push_back(FSM);
//   }
// 	
// 
// 	bool printFlag = true;
// 	while(1)
// 	{
//     pair<int, int> nextFSMs = MapCommonEvents(FSMArray, WORSTCASE_NUMBER_OF_STATES, printFlag);
//     printFlag = false;
//     
//     unsigned long int stateSpace = GetUpperBoundStateSpace(FSMArray);
//     cout <<"GB currently needed: "<< (stateSpace >> 30) << endl;
//     
//     if((nextFSMs.first == -1) || ((stateSpace>>30) < 4) )
//     {
//       cout << "Memory is now sufficent to perform on-the-fly composition." << endl;
//       break;
//     }
//     else
//     {
//       cout << FSMArray[nextFSMs.first].fsmName << " and " << FSMArray[nextFSMs.second].fsmName;
//       cout << " will be composed." << endl; 
//     }
//     
//     vector<FSM_struct> tempArray;
//     tempArray.push_back(FSMArray[nextFSMs.first]);
//     tempArray.push_back(FSMArray[nextFSMs.second]);
// 
//     FSM_struct fsm;
//     unsigned int totalStatesAccessed = FullParCompWithOutput(tempArray, "", &fsm);
//        
//     FSMArray.erase(FSMArray.begin()+ max(nextFSMs.first, nextFSMs.second));
//     FSMArray.erase(FSMArray.begin()+ min(nextFSMs.first, nextFSMs.second));
//     
//     FSMArray.push_back(fsm);   
//   }
//   
//   //Temp output 
//   FullParCompWithOutput(FSMArray, "./", NULL);
//   
  return 0;
}




	
		
		
		
		
		
	


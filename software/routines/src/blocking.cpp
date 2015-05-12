
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
#include <stdlib.h>
#include <string.h>


#include "FSMDataStructures.h"
#include "MemoryManager.h"
#include "EventManager.h"
#include "StateEncoder.h"

#include "HeuristicUtilities.h"
#include "IO_Utilities.h"
#include "ParCompUtilities.h"

using namespace std;

static bool verboseFlag = 0;

/*
 * @brief This program can be broken into multiple stages:
 *          1) The FSM's passed into the command line are parsed 
 *          2) These FSM's are pairwise-parallel composed to reduce state space
 *          3) When pairwise composition cannot further reduce state space, on-the-fly composition is performed
 */
int main(int argc, char * argv[])
{ 
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//   //~~~~~~~~~~~~~~~~~~~~~~ Check inputs and set flags ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//   if(argc <= 1) 
//   {
//     cout << "main: Format is: <executable> [-v] <file1.fsm> <file2.fsm> ... Exiting application." << endl;
//     return 1;
//   }
//   
//   //Set flags
//   int nextArg = 1;
//   for(; nextArg<argc; nextArg++)
//   {
//     if(argv[nextArg][0] != '-')
//       break;
//     else if(!strcmp("-v", argv[nextArg])) //Verbose output
//       verboseFlag = true;
//     else if(!strcmp("-h", argv[nextArg]))
//     {
//       cout << "Format is: <executable> [-v] [-h] <file1.fsm> <file2.fsm> ..." << endl;
//       cout << "Flags:" << endl;
//       cout << "\t-v: Verbose output. Print everything." << endl;
//       cout << "\t-h: Print this help menu and exit." << endl;
//       cout << "Exiting application." << endl;
//       return 0;
//     }
//     else
//     {
//       cout << "main: " << argv[nextArg] << " is not a valid option" << endl;
//       cout << "main: Set flag -h for command line information. Exiting application." << endl;
//       return 1;
//     }
//   }   
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//   
//   //~~~~~~~~~~~~~~~~~~~~ Read in FSM files ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//   cout << "Reading in " << (argc-nextArg) << " .fsm files ... ";
// 	//Declare vector of FSM_structs
// 	vector<FSM_struct> FSMArray;
// 	
// 	//Loop through input files, adding each to the array
//   for(int filenum=nextArg; filenum<argc; filenum++)
//   {
//     //Get filepath of .fsm file
//     string filePath(argv[filenum]);
//     
//     //Read in file and error check
//     FSM_struct FSM;
//     if( false == IO_Utilities::ReadFsmFileIntoStruct(FSM, filePath) )
//     {
//       cout << "main: Encountered an error when reading in " << filePath << endl;   
//       cout << "main: Set flag -h for command line information. Exiting application." << endl;
//       return 1;
//     }
//     
//     //Append new FSM to array
//     FSMArray.push_back(FSM);
//   }
//   
//   //Print update
//   cout << "Done" << endl;
//   if(verboseFlag)
//   {
//     cout<<FSMArray.size()<<" automata read in: "<<endl;
//     unsigned long int worstcase = 1;
// 
//     for(int i=0; i<FSMArray.size(); i++)
//     {
//       cout<<FSMArray[i].fsmName<<"\t"<<FSMArray[i].GetNumberOfStates()<<" states\t";
//       cout<<FSMArray[i].numEvents<<" events\t";
//       cout<<ceil(log2(FSMArray[i].GetNumberOfStates()))<<" bits\n";
//       worstcase *= FSMArray[i].GetNumberOfStates();
//     }
// 
//     cout<<"Worst case (shuffle) is "<<worstcase;
//     cout<<" states after parallel composition."<<endl;
//     
//     //Calculate number of bits needed to encode the state spac
//     int totalNumBits = GetNumberOfBitsToEncodeUncompressed(FSMArray);
//     cout << "Bits currently needed to encode: " << totalNumBits << endl;
//   }
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//  
// 	
//   //~~~~~~~~~~~ Reduce state space with pairwise ParComp ~~~~~~~~~~~~~~~~~~~~~~~~~~//
// 	cout << "Performing pairwise parallel composition to reduce state space... ";
//   uint64_t totalStateSpace = GetUpperBoundStateSpace(FSMArray);
//   int totalNumBits = GetNumberOfBitsToEncodeUncompressed(FSMArray);
//   
//   //Reduce until all states can be encoded
// 	while( totalStateSpace > MAX_STATE_ENCODING )
// 	{
//     //Determine most similar pair of FSMs
//     pair<int, int> nextFSMs = MapCommonEvents(FSMArray, MAX_STATE_ENCODING, verboseFlag);
//     
//     //If reduction was not possible, exit application
//     if(nextFSMs.first == -1 || nextFSMs.second == -1)
//     {
//       cout << "main: Application was not able to reduce FSM's sufficiently. Exiting application." << endl;
//       exit(1);
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
//     
//     totalStateSpace = GetUpperBoundStateSpace(FSMArray);
//     totalNumBits = GetNumberOfBitsToEncodeUncompressed(FSMArray);        
//     cout << "Bits currently needed to encode: " << totalNumBits << endl;
//     cout << "Number of states: " << totalStateSpace << endl;
//   }
//   cout << "Done." << endl;
//   
//   
//   
//   cout << "State space is now sufficently small to perform on-the-fly composition." << endl;
//   cout << "Starting ON-THE-FLY parcomp with "<< FSMArray.size() << " remaining FSMs" << endl;
//   unsigned int totalBlockingStatesFound = OnTheFlyParComp(FSMArray);
//   cout << "PARCOMP complete. " << totalBlockingStatesFound << " blocking states found." << endl;
//   
  return 0;
}






	
		
		
		
		
		
	
	
	
	

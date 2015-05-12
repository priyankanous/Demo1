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
// 	//Declare vector of FSM_structs
// 	vector<FSM_struct> FSMArray;
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
//   map<string, pair<int,int> > division;
//   
//   int counter = 0;
//   for(int i=0; i<FSMArray.size(); i++)
//   {
//     for(int j=0; j<FSMArray[i].states.size(); j++)
//     {
//       for(int k=0; k<FSMArray[i].states[j].transitions.size(); k++)
//       {
//         int newdest = FSMArray[i].states[j].transitions[k].dest;
//         string newevent = FSMArray[i].states[j].transitions[k].event;
//         
//         if(FSMArray[i].states[newdest].marked)
//         {
//           division[newevent].first++;
//         }
//         else
//         {
//           division[newevent].second++;
//         }
//         counter++;
//       }
//     }
//   }
//   
//   for(map<string, pair<int,int> >::iterator it = division.begin(); it != division.end(); it++)
//   {
//     cout << it->first << "\t" << it->second.first << "\t" << it->second.second << endl;
//   }
//   cout << "Total: " << counter << " transitions." << endl;
  return 0;
}

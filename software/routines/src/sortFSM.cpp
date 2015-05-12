
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



bool SortStatesByName(State i, State j)
{
  return (i.stateName.compare(j.stateName) < 0);
}

bool SortTransitionsByEventName(Trans i, Trans j)
{
  return (i.event.compare(j.event) < 0);
}

int remapStates(vector<State> & newStates, string oldName)
{
  for(int j=0; j<newStates.size(); j++)
  {
    if( !newStates[j].stateName.compare(oldName) )
    {
      return j;
    }
  }
  
  return -1;
}
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
// 	for(int i=0; i<FSMArray.size(); i++)
// 	{ 	  
// 	  /***** Sort transitions by their event names ******/
// 	  vector<string> oldStates;
// 	  for(int j=0; j<FSMArray[i].states.size(); j++)
// 	  {
// 	    oldStates.push_back(FSMArray[i].states[j].stateName);
// 	    sort(FSMArray[i].states[j].transitions.begin(), FSMArray[i].states[j].transitions.end(), SortTransitionsByEventName);
//     }
//     
// 	  /***** Sort states by their state names ******/
// 	  sort(FSMArray[i].states.begin(), FSMArray[i].states.end(), SortStatesByName);
// 	  
//     /***** Remap the transitions ******/
//     for(int j=0; j<FSMArray[i].states.size(); j++)
// 	  {
//    	  for(int k=0; k<FSMArray[i].states[j].transitions.size(); k++)
// 	    {
// 	      FSMArray[i].states[j].transitions[k].dest = remapStates(FSMArray[i].states, oldStates[FSMArray[i].states[j].transitions[k].dest]);
// 	    }
// 	  }
// 	  /***** Print state to file *******/
// 	  ofstream outfile;
//     string filepath = "./" + FSMArray[i].fsmName + "_sorted.fsm";
//     outfile.open(filepath.c_str());
//     if(!outfile.is_open())
//     {
//       cerr << "File "<< filepath << " failed to open!" << endl;
//     }
//     else
//     {
//       IO_Utilities::printFSM(FSMArray[i], outfile, 0);
//       outfile.close();
//     }
// 	}

  return 0;
}


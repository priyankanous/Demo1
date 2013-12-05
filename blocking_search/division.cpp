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
	
  map<string, pair<int,int> > division;
  
  for(int i=0; i<FSMArray.size(); i++)
  {
    for(int j=0; j<FSMArray[i].states.size(); j++)
    {
      for(int k=0; k<FSMArray[i].states[j].transitions.size(); k++)
      {
        int newdest = FSMArray[i].states[j].transitions[k].dest;
        string newevent = FSMArray[i].states[j].transitions[k].event;
        
        if(FSMArray[i].states[newdest].marked)
        {
          division[newevent].first++;
        }
        else
        {
          division[newevent].second++;
        }
      }
    }
  }
  
  for(map<string, pair<int,int> >::iterator it = division.begin(); it != division.end(); it++)
  {
    cout << it->first << "\t" << it->second.first << "\t" << it->second.second << endl;
  }
  return 0;
}

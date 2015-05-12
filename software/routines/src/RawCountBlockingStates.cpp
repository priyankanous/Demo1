#include <iostream>
#include <iomanip>
#include <fstream>
#include <vector>
#include <string>
#include <map>
#include <utility>
#include <algorithm>
#include <stack>
#include <bitset>
#include <cmath>
#include <string.h>
#include <sys/time.h>

#include "FSM.h"
#include "ParCompUtilities.h"
#include "TRWSpecialUtilities.h"

using namespace std;

static bool verboseFlag;

float GetCommonalityOfEventSets(const vector<FSM> & automata)
{
  //Return 0 on empty set
  if(automata.size() == 0)
    return 0;
  else if(automata.size() == 1)
    return 1;

  //Get the union
  vector<string> event_union = GetEventUnionOfAllAutomata(automata);

  //Get the intersection
  vector<string> intersection = automata[0].GetAllEvents();
  for(int i=1; i<automata.size(); i++)
  {
    vector<string> events = automata[i].GetAllEvents();
    vector<string> result(intersection.size());
    set_intersection(intersection.begin(), intersection.end(), events.begin(), events.end(), result.begin());
    intersection = result;
  }

  //If the union is zero, return 0
  if(!event_union.size())
    return 0;

  //Return the ratio
  return (float)intersection.size() / (float) event_union.size();
}

int main(int argc, char * argv[])
{
  //~~~~~~~~~~~~~~~~~~~~~~ Check inputs and set flags ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  if(argc <= 1) 
  {
    cout << "main: Format is: <executable> [-v] [-h] <file1.fsm> <file2.fsm> ... Exiting application." << endl;
    return 1;
  }
  
  //Set flags
  int nextArg = 1;
  for(; nextArg<argc; nextArg++)
  {
    if(argv[nextArg][0] != '-')
      break;
    else if(!strcmp("-v", argv[nextArg])) //Verbose output
      verboseFlag = true;
    else if(!strcmp("-h", argv[nextArg]))
    {
      cout << "Format is: <executable> [-v] [-h] <file1.fsm> <file2.fsm> ..." << endl;
      cout << "Flags:" << endl;
      cout << "\t-v: Verbose output. Print everything." << endl;
      cout << "\t-h: Print this help menu and exit." << endl;
      cout << "Exiting application." << endl;
      return 0;
    }
    else
    {
      cout << "main: " << argv[nextArg] << " is not a valid option" << endl;
      cout << "main: Set flag -h for command line information. Exiting application." << endl;
      return 1;
    }
  }   
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  vector<FSM> automata;

  //~~~~~~~~~~~~~~~~~~ Read in automata ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Importing " << (argc - nextArg) << " .fsm files..."; cout.flush();
  for(; nextArg<argc; nextArg++)
  {
    string filepath(argv[nextArg]);
    automata.push_back(FSM(filepath));
  }
  cout << "Success" << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //~~~~~~~~~~~~~~~~~ Add alias transitions to automata ~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Adding alias transitions to automata..."; cout.flush();
  for(int i=0; i<automata.size(); i++)
  {
    AddDcAliasTransitions(automata[i]);
  }
  cout << "Success" << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
 
  //This map will track the percent reduction
  map<pair<string,string>, float> reductionMap;
  ofstream common("common.csv");

  while(GetCartesianStateSpace(automata) > MAX_NUMBER_OF_STATES_ALLOWED)
  {
    cout << "Examining " << automata.size() << " automata (" << GetCartesianStateSpace(automata) << " states)" << endl;

    //Loop through all pairs of automata
    for(int i=0; i<automata.size()-1; i++)
    {
      for(int j=i+1; j<automata.size(); j++)
      { 
        vector<FSM> subset;
        subset.push_back(automata[i]);
        subset.push_back(automata[j]);

        //No need to recalculate the reduction
        if(reductionMap.find(make_pair(automata[i].Name, automata[j].Name)) != reductionMap.end())
        {
          cout << automata[i].Name << " | " << automata[j].Name;
          cout << " : " << reductionMap[make_pair(automata[i].Name, automata[j].Name)];
          cout << "\t" << GetCommonalityOfEventSets(subset)*100 << "%" << " alike" << endl;
        } 

        //Throw out cases over 1 million
        else if(0) //GetCartesianStateSpace(subset) > 10000000)
        { subset.clear(); continue; }

        else if(1) //GetEventUnionOfAllAutomata(subset).size() < (automata[i].GetNumberOfEvents()+automata[j].GetNumberOfEvents()))
        {
          int numStates = ParCompAcc(subset, NULL, true, NULL, true);
          float p =  (float)numStates/(float)GetCartesianStateSpace(subset);
          reductionMap.insert(make_pair(make_pair(automata[i].Name, automata[j].Name), p));
          cout << automata[i].Name << " | " << automata[j].Name;
          cout << " : " << p << "\t(" << numStates << " states)\t";
          cout << GetCommonalityOfEventSets(subset)*100 << "%" << " alike" <<  endl;
          common << GetCommonalityOfEventSets(subset)*100 << ",";
          common << p << "," << automata[i].Name << "," << automata[j].Name <<endl;
        }
        subset.clear();
      }
    }
    cout << endl;
    common.close();

    //Find current best
    map<pair<string,string>, float>::iterator it = reductionMap.begin(), best = reductionMap.begin();
    for(; it != reductionMap.end(); it++)
    {
      //If the current pair is better than the best, make it the best
      if(it->second < best->second)
        best = it;
    }

    string fsm1 = best->first.first, fsm2 = best->first.second;
    cout << " COMPOSING BEST: "  << fsm1 << " | " << fsm2 << " : " << best->second << endl;
    FSM Result;
    vector<FSM> subset;
    for(int i=0; i<automata.size(); i++)
    {
      if(!automata[i].Name.compare(fsm1) || !automata[i].Name.compare(fsm2))
      {
        subset.push_back(automata[i]);
      }
    }
    ParCompAcc(subset, NULL, true, &Result, true);
    
    cout << "Deleting entries in map and vector..."; cout.flush();
    map<pair<string,string>, float>::const_iterator it2 = reductionMap.begin();
    while( it2 != reductionMap.end() )
    {   
      //Check that neither of the names match
      if(!(it2->first.first.compare(fsm1)) || !(it2->first.second.compare(fsm1)) ||
         !(it2->first.first.compare(fsm2)) || !(it2->first.second.compare(fsm2)) )
      {
        it2 = reductionMap.erase(it2);
      }
      else
      {
        it2++;
      }
    }

    vector<FSM>::iterator it3 = automata.begin();
    while(it3 != automata.end())
    {
      if(!it3->Name.compare(fsm1) || !it3->Name.compare(fsm2))
      {
        it3 = automata.erase(it3);
      }
      else
      {
        it3++;
      }
    }
    cout << "Done" << endl;

    //Push back result
    automata.push_back(Result);
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  if(IsDDCSpecUseful(automata))
  {
    automata.push_back(CreateDDCSpecialAutomaton(automata));
    cout << "DDC spec is useful and has been added." << endl;
  }
  else
    cout << "DDC spec is not useful and will not be used." << endl;
  if(IsFaultSpecUseful(automata))
  {
    automata.push_back(CreateFaultSpecialAutomaton(automata));
    cout << "Fault spec is useful and has been added." << endl;
  }
  else
    cout << "Fault spec is not useful and will not be used." << endl;

  uint64_t InitialStateSpace = GetCartesianStateSpace(automata);

  cout << "Composing " << automata.size() << " automata (Max " << InitialStateSpace << " states)" << endl;

  bitset<MAX_NUMBER_OF_STATES_ALLOWED> * bits = new bitset<MAX_NUMBER_OF_STATES_ALLOWED>;
  bits->reset();
  timeval start, end;
  gettimeofday(&start, NULL);
  uint32_t numStatesAccessed = ParCompAcc(automata, bits, true, NULL, true);
  gettimeofday(&end, NULL);

  //Print stats
  float percent= ((float)numStatesAccessed * 100 / (float)InitialStateSpace);
  float rate = (float)numStatesAccessed/((end.tv_sec + end.tv_usec/1000000) - (start.tv_sec + start.tv_usec/1000000));
  cout << numStatesAccessed << " states accessed (" << percent << "%) [" << rate <<" states/sec]" << endl;

  //Print accessibility bitfile  
  cout << "Writing DFS Acc results to file..." << endl;
  string accfile("Stage3_AccBits.txt");
  BitSetToFile(*bits, InitialStateSpace, accfile);
  cout << "Success." << endl;

  //Perform coaccessibility search
  bits->flip();
  gettimeofday(&start, NULL);
  uint32_t numStatesCoaccessed = ParCompCoAcc(automata, bits, true);
  gettimeofday(&end, NULL);

  //Print coaccessibility bitfile  
  cout << "Writing DFS CoAcc results to file..." << endl;
  string coaccfile("Stage3_CoAccBits.txt");
  BitSetToFile(*bits, InitialStateSpace, coaccfile);
  cout << "Success." << endl;

  //Count blocking states
  bits->flip();
  cout << bits->count() << " states are blocking." << endl;

  //Perform the accessibility search once again, printing the transitions to blocking states
  cout << "Performing search of non-blocking space..." << endl;
  ofstream blockout("blocking-events-full.txt");
  cout << FindBlockingTransitions(automata, bits, true, NULL, blockout) << " blocking transitions found" << endl;
  blockout.close(); 
  delete bits;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  return 0;
}
  

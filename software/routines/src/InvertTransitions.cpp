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

  //~~~~~~~~~~~~~~~~~ Invert the automata ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Inverting transitions in " << automata.size() << " automata..."; cout.flush();
  vector<FSM> inverted;
  InvertTransitions(automata, inverted);
  cout << "Success" << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //~~~~~~~~~~~~~~~~~~ Print out automata ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Exporting " << inverted.size() << " automata..."; cout.flush();
  for(int i=0; i<inverted.size(); i++)
  {
    cout << " NumStates: " << inverted[i].GetNumberOfStates() << endl;
    inverted[i].Export(inverted[i].Name+".fsm");
  }
  cout << "Success" << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  return 0;
}


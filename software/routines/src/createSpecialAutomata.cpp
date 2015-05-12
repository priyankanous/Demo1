
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
#include <stdlib.h>
#include <string.h>
#include <fstream>

//#include <TRWSpecialUtilities.h>
//#include <ParCompUtilities.h>

#include <FSMDataStructures.h>
#include <IO_Utilities.h>
#include <ParCompUtilities.h>

using namespace std;

static bool verboseFlag;

int main(int argc, char * argv[])
{
  //~~~~~~~~~~~~~~~~~~~~~~ Check inputs and set flags ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  if(argc <= 1) 
  {
    cout << "main: Format is: <executable> [-v] <file1.fsm> <file2.fsm> ... Exiting application." << endl;
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
  
  //~~~~~~~~~~~~~~~~~~~~ Read in FSM files ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Reading in " << (argc-nextArg) << " .fsm files ... ";
 //Declare vector of automata
 vector<Automaton> FSMArray;
 
 //Loop through input files, adding each to the array
  for(int filenum=nextArg; filenum<argc; filenum++)
  {
    //Get filepath of .fsm file
    string filePath(argv[filenum]);
    
    //Read in file and error check
    string name = IO_Utilities::GetNameFromPath(filePath);
    Automaton FSM(name);

    if( false == IO_Utilities::ReadFsmFileIntoAutomaton(FSM, filePath) )
    {
      cout << "main: Encountered an error when reading in " << filePath << endl;   
      cout << "main: Set flag -h for command line information. Exiting application." << endl;
      return 1;
    }
   
    //Append new FSM to array
    cout << " Done processing " << FSM.Name << endl;
    FSMArray.push_back(FSM);
  }
  
  //Print update
  cout << "Done." << endl;

  //Summary
  cout << FSMArray[0].Name << " has " << FSMArray[0].GetNumberOfStates() << " states." << endl;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  
  /*
  //~~~~~~~~~~~~~~~~~~~~ Add dc transitions to each automaton ~~~~~~~~~~~~~~~~~~~~~~//
  for(int i=0; i<FSMArray.size(); i++)
  {
    //Print update for each fsm
    cout << "Checking " << FSMArray[i].fsmName << " for DC transitions... ";
    int NumberOfTransitionsAdded = AddDcAliasTranistions(FSMArray[i]);
    cout << NumberOfTransitionsAdded << " alias transtions added." << endl;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  
  
  //~~~~~~~~~~~~~~~~~~~ Create the DC rule special automaton ~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Creating special rule automata... ";
  FSM_struct DDCSpecialFsm = CreateDDCSpecialAutomaton(FSMArray);
  FSM_struct FaultSpecialFsm = CreateFaultSpecialAutomaton(FSMArray);
  FSMArray.push_back(DDCSpecialFsm);
  FSMArray.push_back(FaultSpecialFsm);
  cout << "2 automata created." << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  */ 
  
  //~~~~~~~~~~~~~~~~~~~ Write FSMs to file ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Writing FSMs to file..."; cout.flush();
  for(int i=0; i<FSMArray.size(); i++)
  {
    ofstream outfile;
    outfile.open((FSMArray[i].Name + "-dc.fsm").c_str());
    IO_Utilities::PrintAutomatonToFile(FSMArray[i], cout);
    outfile.close();
  }
  cout << "Done." << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
 
  
  //~~~~~~~~~~~~~~~~~~~~ Return successfully ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "Exiting successfully." << endl;
  return 0;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`//
}

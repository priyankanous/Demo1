#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <map>
#include <utility>
#include <algorithm>
#include <stack>
#include <bitset>
#include <cmath>

#include "FSM.h"
#include "ParCompUtilities.h"
#include "TRWSpecialUtilities.h"

using namespace std;


int main(int argc, const char * argv[])
{
  //~~~~~~~~~~~~~~~~~~~~~~ Check inputs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  if(argc != 2) 
  {
    cout << "main: Format is: <executable> <test_case_top_directory>" << endl;
    return 1;
  }
  string directory(argv[1]);
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //~~~~~~~~~~~~~~~~~~~~~~ Run first test case ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "~~~~~~~~~~~~~~ TC0 ~~~~~~~~~~~~~~~" << endl;
  vector<FSM> automata;
  cout << "Importing test case automata..."; cout.flush();
  FSM TC0_G1(directory+"TC0/G1.fsm");
  FSM TC0_G2(directory+"TC0/G2.fsm");
  FSM TC0_G3(directory+"TC0/G3.fsm");
  FSM TC0_G123(directory+"TC0/G123.fsm");
  cout << "Success." << endl;

  cout << "Performing parallel composition 1 of 4..." << endl;
  FSM TC0_result;
  automata.push_back(TC0_G1);
  automata.push_back(TC0_G2);
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  automata.clear();
  automata.push_back(TC0_result);
  automata.push_back(TC0_G3);
  TC0_result.Clear();
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  if(AreAutomataEqual(TC0_result, TC0_G123) == true)
    cout << "Success." << endl;
  else
  {
    cout << "TC0 FAILED. " << endl;
    return 0;
  }

  cout << "Performing parallel composition 2 of 4..." << endl;
  automata.clear();
  TC0_result.Clear();
  automata.push_back(TC0_G1);
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  automata.clear();
  automata.push_back(TC0_result);
  automata.push_back(TC0_G2);
  automata.push_back(TC0_G3);
  TC0_result.Clear();
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  if(AreAutomataEqual(TC0_result, TC0_G123) == true)
    cout << "Success." << endl;
  else
  {
    cout << "TC0 FAILED. " << endl;
    return 0;
  }

  cout << "Performing parallel composition 3 of 4..." << endl;
  automata.clear();
  TC0_result.Clear();
  automata.push_back(TC0_G2);
  automata.push_back(TC0_G3);
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  automata.clear();
  automata.push_back(TC0_G1);
  automata.push_back(TC0_result);
  TC0_result.Clear();
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  if(AreAutomataEqual(TC0_result, TC0_G123) == true)
    cout << "Success." << endl;
  else
  {
    cout << "TC0 FAILED. " << endl;
    return 0;
  }

  cout << "Performing parallel composition 4 of 4..." << endl;
  automata.clear();
  TC0_result.Clear();
  automata.push_back(TC0_G1);
  automata.push_back(TC0_G2);
  automata.push_back(TC0_G3);
  ParCompAcc(automata, NULL, true, &TC0_result, true);
  if(AreAutomataEqual(TC0_result, TC0_G123) == true)
    cout << "TC0 PASSED." << endl;
  else
  {
    cout << "TC0 FAILED. " << endl;
    return 0;
  }
  
  cout << "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" << endl << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //~~~~~~~~~~~~~~~~~~~~~~ Run second test case ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "~~~~~~~~~~~~~~ TC1 ~~~~~~~~~~~~~~~" << endl;
  
  cout << "Reading in automata..."; cout.flush();
  FSM T1_G1(directory+"TC1/G1_t-tc.fsm");
  FSM T1_G2(directory+"TC1/G2_t-tc.fsm");
  FSM T1_G1_dc(directory+"TC1/G1_t-tc.fsm");
  FSM T1_G2_dc(directory+"TC1/G2_t-dc_mod-tc.fsm");
  FSM T1_G12(directory+"TC1/G12-tp-DDC.fsm");
  FSM DDCSpecTrue(directory+"TC1/spec.fsm");
  cout << "Success." << endl;

  cout << "Adding dc alias transitions..."; cout.flush();
  AddDcAliasTransitions(T1_G1);
  AddDcAliasTransitions(T1_G2);
  if(!AreAutomataEqual(T1_G1, T1_G1_dc) || !AreAutomataEqual(T1_G2, T1_G2_dc))
  {
    cout << "Automata are not correct after alias transitions are added." << endl;
    cout << "TC1 FAILED" << endl;
    return 0;
  }
  cout << "Success." << endl;

  automata.clear();
  automata.push_back(T1_G1);
  automata.push_back(T1_G2);

  cout << "Creating spec automaton..."; cout.flush();
  FSM DDCSpec = CreateDDCSpecialAutomaton(automata);
  if(!AreAutomataEqual(DDCSpec, DDCSpecTrue))
  {
    cout << "DDC Spec is not correct." << endl;
    cout << "TC1 FAILED" << endl;
    return 0;
  }
  cout << "Success." << endl;

  automata.push_back(DDCSpec);
  cout << "Performing parallel compostion..."; cout.flush();
  FSM T1_result;
  ParCompAcc(automata, NULL, true, &T1_result, true);
  cout << "Success" << endl;

  //Check equality
  if(AreAutomataEqual(T1_result, T1_G12) == true)
    cout << "TC1 PASSED. " << endl;
  else
  {
    cout << "TC1 FAILED. " << endl;
    return 0;
  }
  cout << "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" << endl << endl;  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //~~~~~~~~~~~~~~~~~~~~~~ Run fifth test case ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  cout << "~~~~~~~~~~~~~~ TC4 ~~~~~~~~~~~~~~~" << endl;
  automata.clear();
  cout << "Importing test case automata..."; cout.flush();
  automata.push_back(FSM(directory+"TC4/da_v4.fsm"));
  automata.push_back(FSM(directory+"TC4/kivl_v3.fsm"));
  automata.push_back(FSM(directory+"TC4/lkp_v3.fsm"));
  automata.push_back(FSM(directory+"TC4/lp_v3.fsm"));
  automata.push_back(FSM(directory+"TC4/retry_v3.fsm"));
  automata.push_back(FSM(directory+"TC4/ula_v4.fsm"));
  automata.push_back(FSM(directory+"TC4/subsys3min.fsm"));
  automata.push_back(FSM(directory+"TC4/temp5min.fsm"));
  FSM T4_out(directory+"TC4/out_mark.fsm");
  cout << "Success." << endl;

  cout << "Checking depth-first Acc search...." << endl;
  bitset<MAX_NUMBER_OF_STATES_ALLOWED> * bits = new bitset<MAX_NUMBER_OF_STATES_ALLOWED>;
  FSM T4_result;
  uint32_t numStates = ParCompAcc(automata, bits, false, &T4_result, true);
  if(numStates == T4_out.GetNumberOfStates() && numStates == bits->count() && AreAutomataEqual(T4_result, T4_out))
    cout << "Success. " << endl;
  else
  {
    cout << "DFS of Acc failed!" << endl;
    cout << "TC4 FAILED. " << endl;
    return 0;
  }

  cout << "Checking depth-first Coacc search...." << endl;
  bits->flip();
  numStates = ParCompCoAcc(automata, bits, false);
  FSM T4_out_trim(directory+"TC4/out_mark_trim.fsm");
  if(numStates == T4_out_trim.GetNumberOfStates())
    cout << "Success. " << endl;
  else
  {
    cout << "numStates = " << numStates << " | solution = " << T4_out_trim.GetNumberOfStates() << endl;
    cout << "DFS of Coacc failed!" << endl;
    cout << "TC4 FAILED. " << endl;
    return 0;
  }

  cout << "Comparing non-blocking portions of the graph..." << endl;
  bits->flip();
  FSM T4_nb;
  ofstream oftc4("TC4_block.txt");
  FindBlockingTransitions(automata, bits, false, &T4_nb, oftc4);
  //Check equality
  if(!AreAutomataEqual(T4_nb, T4_out_trim))
  {
    cout << "TC4 FAILED. " << endl;
    return 0;
  }
  cout << "TC4 PASSED. " << endl;
  cout << "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" << endl << endl;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


  return 0;

}


#ifndef _IO_UTILITIES_H_
#define _IO_UTILITIES_H_

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
#include <sstream>


#include "FSMDataStructures.h"
//#include "StateEncoder.h"
//#include "EventManager.h"

#define UMDES_PRINT_FORMAT 1
#define SPECIAL_EVENTS_FORMAT !UMDES_PRINT_FORMAT

namespace IO_Utilities
{
  /*
   * @brief Reads a .fsm file into an Automaton structure
   * @param automaton The automaton to be populated
   * @param filepath The file path of the file to be read from
   * @returns true if was successful, false otherwise
   */
  bool ReadFsmFileIntoAutomaton(Automaton & automaton, std::string filepath);

  /*
   * @brief Prints an Automaton to a file stream
   * @param automaton The automaton to be printed
   * @param outfile The file stream to be written
   */
  void PrintAutomatonToFile(const Automaton & automaton, std::ostream & outfile);

  std::string GetNameFromPath (const std::string& str);
/*
  void WriteStateToFile( EncodedStateType currentState, 
                        std::vector<CompositeTransition> & nextStates, 
                        bool marked, std::ofstream & outfile, StateEncoder & encoder, 
                        std::pair<EventTypeMask, std::string>, std::string & titleAppend);

  void AddStateToFSM( EncodedStateType currentState, 
                        std::vector<CompositeTransition> & nextStates, 
                        bool marked, FSM_struct * fsm, StateEncoder & encoder, 
                        std::pair<EventTypeMask, std::string>, std::string & titleAppend);
                        
  void InvertTransitions( const std::vector<FSM_struct>& FSMArr, std::vector<FSM_struct>& FSMArr_inv);
*/
}
#endif

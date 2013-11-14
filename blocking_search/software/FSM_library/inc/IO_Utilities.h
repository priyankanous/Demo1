#ifndef _IO_UTILITIES_H_
#define _IO_UTILITIES_H_

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
#include <sstream>

#include "FSMDataStructures.h"
#include "StateEncoder.h"
#include "EventManager.h"

#define UMDES_PRINT_FORMAT 0
#define SPECIAL_EVENTS_FORMAT !UMDES_PRINT_FORMAT

int readFSM( std::vector<FSM_struct>& FSMArr, bool print, int argc, char* argv[]);

void printFSM(FSM_struct & FSM, std::ostream & outfile, bool verbose);

std::string GetNameFromPath (const std::string& str);

void WriteStateToFile( unsigned int currentState, 
                      std::vector<Trans> & nextStates, 
                      bool marked, std::ofstream & outfile, StateEncoder & encoder, 
                      std::pair<EventTypeMask, std::string>, std::string & titleAppend);

void AddStateToFSM( unsigned int currentState, 
                    std::vector<std::pair<unsigned int, std::string> > & nextStates, 
                    bool marked, FSM_struct * fsm, StateEncoder & encoder,
                    std::pair<std::string, std::string>, bool special);
                      
void InvertTransitions( const std::vector<FSM_struct>& FSMArr, std::vector<FSM_struct>& FSMArr_inv);

#endif

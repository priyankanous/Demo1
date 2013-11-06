#ifndef _PAR_COMP_UTILITIES_H_
#define _PAR_COMP_UTILITIES_H_

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
#include <map>

#include "FSMDataStructures.h"
#include "MemoryManager.h"
#include "EventManager.h"
#include "StateEncoder.h"

#include "IO_Utilities.h"

enum Direction{
  FORWARD = 0,
  BACKWARD = 1
};

/*
 * @brief Multiply state spaces of all components
 * @return worst-case state space
 */
unsigned long int GetUpperBoundStateSpace(std::vector<FSM_struct>& FSMArr);

/*
 * @brief Perform on-the-fly parComp, not storing copy of resulting FSM
 * @return Number of blocking states
 */
unsigned int OnTheFlyParComp( std::vector<FSM_struct> & FSMArray );

/*
 * @brief The meat of the program. Perform DFS of ParComp
 *        composite state.
 * @return Number of states accessed
 */
unsigned int DepthFirstSearch(std::vector<FSM_struct>& FSMArr, MemoryManager & memory, 
  EventManager & event, StateEncoder & encoder, unsigned int worstcase, 
  std::string outputDirectory, FSM_struct * fsm, Direction dir );

/*
 * @brief Perform on-the-fly accessibility search, storing copy
 *        in file, fsm_struct object, or both
 * @return number Of States accessed
 */
unsigned int FullParCompWithOutput( std::vector<FSM_struct> & FSMArray,  std::string filepath , FSM_struct * fsm);




#endif

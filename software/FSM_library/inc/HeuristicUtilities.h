#ifndef _HEURISTIC_UTILITIES_H_
#define _HEURISTIC_UTILITIES_H_

#include <iostream>
#include <string>
#include <set>
#include <algorithm>


#include "FSMDataStructures.h"

std::pair<int, int> MapCommonEvents(const std::vector< FSM_struct >& FSMArray, const long unsigned int UpperBound, bool printMap);

void GenerateOptimalSubgroups( const std::vector<FSM_struct> & FSMArray);



#endif

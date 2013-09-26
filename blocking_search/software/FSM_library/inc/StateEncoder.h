#ifndef _STATE_ENCODER_H_
#define _STATE_ENCODER_H_

#include <vector>
#include <map>
#include <cmath>

#include "FSMDataStructures.h"

class StateEncoder
{
public:
  StateEncoder( std::vector<int> & numberOfStates );
  StateEncoder( std::vector<FSM_struct> & FSMArray );
  unsigned int StatesToEncodedValue( std::vector<int> & states );
  unsigned int UpdateStateWithTransitions( unsigned int currentState, std::vector< std::pair<int, int> > transitions);
  int FindStateIndex( unsigned int currentState, int fsmIndex);
    
private:
  std::vector<int> numbits;
  std::vector<int> offset;
};




#endif

#ifndef _STATE_ENCODER_H_
#define _STATE_ENCODER_H_

#include <vector>
#include <map>
#include <cmath>
#include <string>
#include <sstream>

#include "FSMDataStructures.h"

class StateEncoder
{
public:
  StateEncoder( const std::vector<FSM_struct> & FSMArray );
  EncodedStateType StatesToEncodedValue( std::vector<int> & states );
  EncodedStateType UpdateStateWithTransitions( EncodedStateType currentState, std::vector< std::pair<int, int> > transitions);
  int FindStateIndex( EncodedStateType currentState, int fsmIndex);
  std::string GenerateStateName( EncodedStateType currentState );
  bool CheckForUnmarkedStates( EncodedStateType currentState ); 
private:
  std::vector<int> numbits;
  std::vector<int> offset;
  std::vector< std::vector< std::pair<std::string, bool> > > stateNames;
};




#endif

#ifndef _EVENT_MANAGER_H_
#define _EVENT_MANAGER_H_

#include <vector>
#include <map>

#include "FSMDataStructures.h"
#include "StateEncoder.h"


enum EventTypeMask
{
  VARIABLE_EVENT   = 0x1,
  EXOGENOUS_EVENT  = 0x2,
  DC_EVENT         = 0x4,
  DDC_EVENT        = 0x8,
  
  NO_EVENTS_MASK   = 0x0,  
  EXO_AND_VAR_MASK = 0x3,
  DC_AND_VAR_MASK  = 0x5,
  DC_AND_EXO_MASK  = 0x6,
  NOT_DDC_MASK     = 0x7,
  DDC_AND_VAR_MASK = 0x9,
  DDC_AND_EXO_MASK = 0xA,
  NOT_DC_MASK      = 0xB,
  DC_AND_DDC_MASK  = 0xC,
  NOT_EXO_MASK     = 0xD,
  NOT_VAR_MASK     = 0xE,
  ALL_EVENTS_MASK  = 0xF
};

#define DEFAULT_EVENT_MASK    ALL_EVENTS_MASK



struct Event
{
	int UniqueFSMcount;
	std::vector<std::pair<int, int> > transitions;
};

struct CompositeTransition
{
  std::string event;
  EncodedStateType dest;
  EventTypeMask mask;
  CompositeTransition(std::string event_, EncodedStateType dest_)
  {
    event = event_;
    dest = dest_;
  }
};


class EventManager
{
public:
  EventManager(const std::vector<FSM_struct> & FSMArray);
  void AddTransitions(const State & state, int fsmIndex, EventTypeMask restriction);
  void GetNextStates( EncodedStateType currentState, std::vector<CompositeTransition> & nextStates );
  EventTypeMask AssignEventMask(const std::string & event);
  EventTypeMask GetEventMask(const std::string & eventString);
  
private:
  std::map<std::string, int> EventFrequency;
  std::map<std::string, EventTypeMask> EventTypeMap;
  std::map<std::string, Event> EventsAtCurrentState;
  StateEncoder encoder;
  
  bool GetNextPermutation( std::vector<int> &, const std::vector<int> &, int);
};




#endif

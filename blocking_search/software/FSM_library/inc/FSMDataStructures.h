#ifndef _FSM_DATA_STRUCTURES_H_
#define _FSM_DATA_STRUCTURES_H_

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

/*
 * A simple struct to store a transition
 */
struct Trans
{
public:
	std::string event;
	unsigned int dest;
	bool obs;
	bool con;
	int mask;
	Trans(){};
	Trans(unsigned int d, std::string e)
	  :event(e), dest(d), obs(1), con(1), mask(0){};
};


/*
 * A struct to store a state
 * A state's local index (in its parent FSM) is its 
 * position in a vector of states in an FSM struct
 */
struct State
{
public:
	bool marked;
	int GetNumberOfTransitions(void) const
	{
	  return transitions.size();
	};
	std::string stateName;
	std::vector<Trans> transitions;
	State(const std::string& str);
};

/*
 * A struct to store an FSM 
 */
struct FSM_struct
{
public:
	std::string fsmName;
	
	int numEvents;
	std::vector<std::string> alphabet;
	std::vector<State> states;
	
	FSM_struct(void);
	void addEvent(std::string& str);
	int getStateIndex(std::string& str);
	int GetNumberOfStates(void) const;
};



/*
 * Keeps track of all events of same name at all current states
 */
struct Event_obj{
	std::string event;
	bool valid;
	int FSMcount;
	std::vector<std::pair<int, int> > transitions;
	
	Event_obj();
	Event_obj(std::string& name, int fsm, int dest);
};

#endif

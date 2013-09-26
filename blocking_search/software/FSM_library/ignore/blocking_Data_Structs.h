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
	A simple struct to store a transition
	Does not contain the start state
*/
struct Trans{
	string event;
	int dest;
	bool obs;
	bool con;
};

/*
	A struct to store a state
	A state's index is its position in a vector of states in an FSM struct
*/
struct State{
	bool marked;
	int numTrans;
	string stateName;
	vector<Trans> transitions;
	State(string& str)
		:stateName(str)
	{};
};

/*
	A struct to store an FSM 
*/
struct FSM_struct{
	string fsmName;
	int numStates;
	int numEvents;
	vector<string> alphabet;
	vector<State> states;
	FSM_struct(int nS)
		:numStates(nS),
		numEvents(0)
	{};
	void addEvent(string& str);
	int getStateIndex(string& str);
};

void FSM_struct::addEvent(string& str){
/* Add events to alphabet. Maintain exactly one entry for each event */
	
	//Linear search for events
	for (vector<string>::iterator it = alphabet.begin() ; it != alphabet.end(); it++)
		if(!str.compare(*it))
			return;
	//Event not found, add it	
	alphabet.push_back(str);
	numEvents++;
};

int FSM_struct::getStateIndex(string& str){
/*
Search for a state in the list of states
If found, return the index
If not found, make a state object and add it to the list, returning that index
*/
    	//Linear search for states
    	for (int i=0; i<states.size(); i++)
    		if(!str.compare(states[i].stateName))
    			return i;
    	
    	//Not found, add state to the end of the states vector
    	State newstate(str);
    	states.push_back(newstate);
    	return states.size()-1;    	
};
    		



/*
Keeps track of all events of same name at all current states
*/
struct Event_obj{
	string event;
	bool valid;
	int FSMcount;
	vector<pair<int, int> > transitions;
	Event_obj()
		:valid(0),
		FSMcount(0) {};
	Event_obj(string& name, int fsm, int dest)
		:valid(0),
		FSMcount(1),
		event(name)
		{
			pair<int,int> mypair(fsm, dest);
			transitions.push_back(mypair);
		};
};


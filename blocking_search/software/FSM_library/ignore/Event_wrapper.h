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

#include <FSMDataStructures.h>

/* 
This class is responsible for:
 establishing the index scheme (based on the input FSMs)
 computing which transitions are valid at each composite state.
 calculating the indices of the valid destination states
 returning a vector of these states when prompted
 
*/

class Event_wrapper{
	public:
		Event_wrapper(map<string, int>& inMap, vector<FSM_struct>& fsmArr);
		void insertTrans(string& event, int fsm, int dest);
		void getNextAddress(vector<unsigned long int>& nextStates, vector<string>& nextEvents, unsigned long int curState);
		bool genPerms(vector<int>& cur, const vector<int>& part, int col);
		void clear(void);
		unsigned long int getAddr(unsigned long int cur, Event_obj& obj);
		vector<int> bits, offset;		
		int totalbits;
	private:
		map<string, int> indexMap;
		map<string, int> eventMap;
		vector<Event_obj> eventArr;
};



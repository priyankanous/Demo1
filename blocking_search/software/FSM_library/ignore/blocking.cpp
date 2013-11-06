using namespace std;
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

#include "blocking_Data_Structs.h"
#include "Event_wrapper.h"
#include "utilities.h"


//Subfunctions	
void printFirstFive(vector<FSM_struct>& FSMArr);
void printEventHashTable(multimap<string, int>& eventHash);
void printAddr(unsigned long int addr, Event_wrapper& Events, vector<FSM_struct>& fsm);
unsigned long int DFS_Acc(vector<FSM_struct>&, vector<bool>&, Event_wrapper&);
unsigned long int DFS_CoAcc(vector<FSM_struct>&, vector<bool>&, vector<bool>&, Event_wrapper&);
void invertTrans(vector<FSM_struct>& FSMArr, vector<FSM_struct>& FSMArr_inv);
void outputFSM(FSM_struct& FSM, string filepath);
bool genPerms(vector<int>& cur, const vector<int>& part, int col);
int readFSM(vector<FSM_struct>& FSMArr, bool print, int argc, char* argv[]);
	
int main(int argc, char* argv[]){

	//Declare vector of FSM_structs
	vector<FSM_struct> FSMArr;
	
	//Read in .fsm files
	//Change second parameter to "0" to not print update
	int worstcase = readFSM(FSMArr, 1, argc, argv);
	
	//Hash events into individual buckets. Store how many automata include them
	map<string, int> eventHash;
	for(int i=0; i<FSMArr.size(); i++){
		for(int j=0; j<FSMArr[i].numEvents; j++){
			auto it = eventHash.find(FSMArr[i].alphabet[j]);
			if (it == eventHash.end())
				eventHash.insert(make_pair(FSMArr[i].alphabet[j], 1));
			else
				it->second++;			
		}
	}
	
	//Initialize addressing object, accessed bitset, coaccessed bitset
	Event_wrapper Events(eventHash, FSMArr);
	unsigned long base = 1;
	unsigned long vecSize = base<<(Events.totalbits);
	vector<bool> accessed(vecSize);
	vector<bool> coaccessed(vecSize);
	
	if(accessed.size() != vecSize || coaccessed.size() != vecSize){
		cerr<< "Memory not allocated properly"<<endl;
		exit(1);
	}

	//Search for accessible
	cout << "Begining depth-first search for accessibility..."<<endl;
	unsigned long int counter = DFS_Acc(FSMArr, accessed, Events);
	cout << "Done with accessibility search. "<<counter<< " states accessed."<<endl;
	
	//Invert transitions in FSM
	vector<FSM_struct> FSMArr_inv;
	invertTrans(FSMArr, FSMArr_inv);
		
	cout<<"FSMs successfully inverted. Initiating coaccessibility DFS.\n";
	
	//Search for coaccesible
	counter = DFS_CoAcc(FSMArr_inv, accessed, coaccessed, Events);
	cout << "Done with coaccessibility search. "<<counter<< " states are coaccessible."<<endl;
	
	//Print blocking states to file
	printBlockingStates(FSMArr, accessed, coaccessed, Events);
	
	cout<<"Program completed."<<endl;				
	
	return 0;
	
}		

unsigned long int DFS_CoAcc(vector<FSM_struct>& FSMArr, vector<bool>& accessed, vector<bool>& coaccessed, Event_wrapper& Events)
{
	//Initialize search stack for depth-first search, add initial state
	//Note that this assumes the 0th state in each file is the marked state
	stack<unsigned long> Stack;
	Stack.push(0); 
	accessed[0] = 1;
	
	//Loop until all states have been visited
	unsigned long int counter = 0;
	unsigned long curState, newState;
	
	while(!Stack.empty()){
		
		//Get current state off top of stack
		curState = Stack.top();
		Stack.pop();
		
		//Loop through each FSM, examining the current state's transitions
		for(int i=0; i<FSMArr.size(); i++){
			//Extract state index from encoded composite state
			int stateIndex = (curState>>Events.offset[i])&((1<<Events.bits[i])-1);
			
			//Loop through transitions at current state of FSM
			//Insert events into Event structs
			for(int j=0; j<FSMArr[i].states[stateIndex].numTrans; j++){
				//Insert each event
				Events.insertTrans(FSMArr[i].states[stateIndex].transitions[j].event, i,
					FSMArr[i].states[stateIndex].transitions[j].dest);
			}
		}

		//Examine all transitions, insert if unvisited
		vector<unsigned long int> nextStates;
		vector<string> nextEvents;
		Events.getNextAddress(nextStates, nextEvents, curState);

		for(auto it=nextStates.begin(); it!=nextStates.end(); it++){	
			if(coaccessed[*it] == 0 && accessed[*it] == 1){
				coaccessed[*it] = 1;
				Stack.push(*it);
			}	
		}

		//Update counter 
		counter++;
		if(!(counter % 10000)){
			cout<<counter<<" states coaccessed.";
			cout<<" Stack size: "<<Stack.size()<<endl;
		}
		
		Events.clear();
	}
	
	return counter;
}

unsigned long int DFS_Acc(vector<FSM_struct>& FSMArr, vector<bool>& accessed, Event_wrapper& Events)
{
	//Initialize search stack for depth-first search, add initial state
	//Note that this assumes the 0th state in each file is the marked state
	stack<unsigned long> Stack;
	Stack.push(0); 
	accessed[0] = 1;
	
	//Loop until all states have been visited
	unsigned long int counter = 0;
	unsigned long curState, newState;
	
	while(!Stack.empty()){	
		//Get current state off top of stack
		curState = Stack.top();
		Stack.pop();
		
		//Loop through each FSM, examining the current state's transitions
		for(int i=0; i<FSMArr.size(); i++){
			//Extract state index from encoded composite state
			int stateIndex = (curState>>Events.offset[i])&((1<<Events.bits[i])-1);
			
			//Loop through transitions at current state of FSM
			//Insert events into Event structs
			for(int j=0; j<FSMArr[i].states[stateIndex].numTrans; j++){
				//Insert each event
				Events.insertTrans(FSMArr[i].states[stateIndex].transitions[j].event, i,
					FSMArr[i].states[stateIndex].transitions[j].dest);
			}
		}

		//Examine all transitions, insert if unvisited
		vector<unsigned long int> nextStates;
		vector<string> nextEvents;
		Events.getNextAddress(nextStates, nextEvents, curState);

		for(auto it=nextStates.begin(); it!=nextStates.end(); it++){	
			if(accessed[*it] == 0){
				accessed[*it] = 1;
				Stack.push(*it);
			}	
		}

		//Update counter 
		counter++;
		if(!(counter % 10000)){
			cout<<counter<<" states accessed.";
			cout<<" Stack size: "<<Stack.size()<<endl;
		}
		
		Events.clear();
	}
	
	return counter;
}


	
		
		
		
		
		
	
	
	
	
	

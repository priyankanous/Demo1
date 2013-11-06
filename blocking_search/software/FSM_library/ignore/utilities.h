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


void printBlockingStates(vector<FSM_struct>& FSMArr, vector<bool>& accessed, vector<bool>& coaccessed, Event_wrapper& Events)
{
 	//Open file, print header
	ofstream outfile;
	string outTitle = "blocking_states.txt";
	outfile.open(outTitle);
	outfile<<"Index\t";
	for(int i=0; i<FSMArr.size(); i++)
		outfile<<FSMArr[i].fsmName<<"\t";
	outfile<<endl;
	
	//Search for and print blocking states
	unsigned long counter = 0;
	for(unsigned long int i=0; i<accessed.size(); i++){
		if(accessed[i] && !coaccessed[i]){
			//Print states to file
			outfile<<i<<"\t";
			for(int j=0; j<FSMArr.size(); j++){
				long int curstate = (i>>Events.offset[j])&((1<<Events.bits[j])-1);
				outfile<<FSMArr[j].states[curstate].stateName<<"\t";
			}
			outfile<<endl;
			counter++;
		}
	}
	
	outfile.close();
	
	if(!counter) cout<<"No blocking states detected.\n";
	else{
		cout<<counter<<" blocking states detected.\n";
		cout<<"Blocking states printed to "<<outTitle<<endl;
	}
}

int readFSM(vector<FSM_struct>& FSMArr, bool print, int argc, char* argv[]){	
	//Loop through input FSM files, read into structs
	for(int filenum=1; filenum<argc; filenum++){
		//Open up fsm
		ifstream infile;
		infile.open(argv[filenum]);
		if(infile.fail()){
			cout<<argv[filenum]<<" does not exist in this directory. Exiting.\n";
			exit(1);
		}
		int numStates;
		string junk;
		infile >> numStates;
		getline(infile, junk); 
	
		//Build FSM Struct
		FSM_struct FSM1(numStates);
		string name = argv[filenum];
		name.erase(name.end()-4, name.end());
		FSM1.fsmName = name;
	
		//Loop through states
		for(int i=0; i<numStates; i++){
			//Read in state name
			string stateName;
			infile >> stateName;
		
			//Find state entry for this state, insert if necessary 
			int stateindex = FSM1.getStateIndex(stateName);
			infile >> FSM1.states[stateindex].marked;
			infile >> FSM1.states[stateindex].numTrans;
		
			//Loop for events
			for(int j=0; j<FSM1.states[stateindex].numTrans; j++){
				//Create new transistion, fill from file
				Trans newtrans;
				string dest;
				string c, o;
				infile >> newtrans.event >> dest >> c >> o;
				if(!c.compare("c"))
					newtrans.con = 1;
				else
					newtrans.con = 0;
				if(!o.compare("o"))
					newtrans.obs = 1;
				else
					newtrans.obs = 0;
				
				newtrans.dest = FSM1.getStateIndex(dest);
			
				//Add eventName to alphabet if necessary
				FSM1.addEvent(newtrans.event);
			
				//Add transition to state
				FSM1.states[stateindex].transitions.push_back(newtrans);	
			}
	
			getline(infile, junk);
		}	
		infile.close();	
		FSMArr.push_back(FSM1);
	}
	
	//Print update
	if(print){cout<<FSMArr.size()<<" automata read in: "<<endl;}
	unsigned long int worstcase = 1;

	for(int i=0; i<FSMArr.size(); i++){
		if(print){
			cout<<FSMArr[i].fsmName<<"\t"<<FSMArr[i].numStates<<" states\t";
			cout<<FSMArr[i].numEvents<<" events\t";
			cout<<ceil(log2(FSMArr[i].numStates))<<" bits\n";}
		worstcase *= FSMArr[i].numStates;
	}
	if(print){
		cout<<"Worst case (shuffle) is "<<worstcase;
		cout<<" states after parallel composition."<<endl;
	}
	
	return worstcase;
}

void outputFSM(FSM_struct& FSM, string filepath){

	ofstream outfile;
	
	outfile.open(filepath+"/"+FSM.fsmName+".fsm");
	outfile << FSM.numStates<<endl<<endl;
	
	for(int i=0; i<FSM.numStates; i++){
		outfile << FSM.states[i].stateName << "\t";
		if(FSM.states[i].marked)
			outfile << "1\t";
		else
			outfile << "0\t";
		outfile << FSM.states[i].numTrans<<endl;
		for(int j=0; j<FSM.states[i].numTrans; j++){
			outfile << FSM.states[i].transitions[j].event<<"\t";
			outfile << FSM.states[FSM.states[i].transitions[j].dest].stateName<<"\t";
			outfile << "c\to\t";
			/*
			if (FSM.states[i].transitions[j].con)
				outfile << "c\t";
			else
				outfile << "uc\t";
			if (FSM.states[i].transitions[j].obs)
				outfile << "o\t";
			else
				outfile << "uo\t";	
			*/
			outfile << endl;
		}
		outfile<<endl;
	}
	
	outfile.close();
}

void invertTrans(vector<FSM_struct>& FSMArr, vector<FSM_struct>& FSMArr_inv)
{
	//Invert transitions, making new FSMs
	
	for(int i=0; i<FSMArr.size(); i++){
		FSM_struct inv(FSMArr[i].numStates);
		inv.fsmName = FSMArr[i].fsmName + "_inv";
		inv.numEvents = FSMArr[i].numEvents;
		inv.alphabet = FSMArr[i].alphabet;
		for(int j=0; j<inv.numStates; j++){
			State state_inv(FSMArr[i].states[j].stateName);
			state_inv.marked = FSMArr[i].states[j].marked;
			state_inv.numTrans = 0;
			inv.states.push_back(state_inv);
		}
		for(int j=0; j<inv.numStates; j++){
			for(int k=0; k<FSMArr[i].states[j].numTrans; k++){
				Trans trans_inv;
				int newSource = FSMArr[i].states[j].transitions[k].dest;
				trans_inv.event = FSMArr[i].states[j].transitions[k].event;
				trans_inv.con = FSMArr[i].states[j].transitions[k].con;
				trans_inv.con = FSMArr[i].states[j].transitions[k].obs;
				trans_inv.dest = j;
				inv.states[newSource].transitions.push_back(trans_inv);
				inv.states[newSource].numTrans++;
			}
		}
		FSMArr_inv.push_back(inv);
	}
}


void printAddr(unsigned long int addr, Event_wrapper& Events, vector<FSM_struct>& fsm)
{
	//Print component states
	cout<<addr<<"\t";
	for(int i=0; i<fsm.size(); i++){
		unsigned long int curstate = (addr>>Events.offset[i])&((1<<Events.bits[i])-1);
		cout<<fsm[i].states[curstate].stateName<<"\t";
	}
}


void printFirstFive(vector<FSM_struct>& FSMArr)
//Print first five states of all FSMs
//Used for debugging
{
	cout<<"NUMFSM: "<<FSMArr.size()<<endl;
	
	for(int q=0; q<FSMArr.size();q++){
		cout<<"FSM_NAME: "<<FSMArr[q].fsmName<<endl;
		cout<<"NUMSTATES: "<<FSMArr[q].numStates<<endl;
		cout<<"NUMEVENTS: "<<FSMArr[q].numEvents<<endl;
		int indexnum = 0;
		for(vector<State>::iterator it = FSMArr[q].states.begin(); it!=FSMArr[q].states.end(); it++){
			cout<<indexnum<<"\t"<< (*it).stateName<<"\t"<< (*it).marked<<"\t"<<(*it).numTrans<<endl;
			indexnum++;
		}
	
		for(int k=0; k<min(5,FSMArr[q].numStates); k++){
			cout<<"STATENAME: "<<FSMArr[q].states[k].stateName<<endl;
			for(vector<Trans>::iterator it = FSMArr[q].states[k].transitions.begin(); it != FSMArr[q].states[k].transitions.end(); it++)
				cout<<(*it).event<<"\t"<<FSMArr[q].states[(*it).dest].stateName<<"\t"<<(*it).con<<"\t"<<(*it).obs<<endl;
			cout<<endl;
		}
		cout<<endl;
	}
}	
	
void printEventHashTable(multimap<string, int>& eventHash)
{
 	
  	//Sample runs
  	vector<string> strings = {"DA", "DS"};
  	for(int i=0; i<strings.size(); i++){
	  	pair <multimap<string,int>::iterator, multimap<string,int>::iterator> ret;
		ret = eventHash.equal_range(strings[i]);
		cout << strings[i] << " =>";
		for (multimap<string,int>::iterator it=ret.first; it!=ret.second; ++it)
		  	cout << ' ' << it->second;
		cout << '\n';
		int count = eventHash.count(strings[i]);
		cout<< count << " elements with "<< strings[i] << " as key.\n";
	}
	
	
}		

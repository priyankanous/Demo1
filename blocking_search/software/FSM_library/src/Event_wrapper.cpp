
#include <Event_wrapper.h>

using namespace std;

Event_wrapper::Event_wrapper(map<string, int>& inMap, vector<FSM_struct>& fsmArr)
{
	eventMap = inMap;
	int offsetSum=0;
	for(vector<FSM_struct>::iterator it=fsmArr.begin(); it!=fsmArr.end(); it++){
		int numbits = ceil(log2((*it).numStates));
		bits.push_back(numbits);
		offsetSum+= numbits;
		offset.push_back(offsetSum);
	}
	totalbits = offsetSum;
	for(vector<int>::iterator it=offset.begin(); it!=offset.end(); it++)
		*it = totalbits-*it;
}

bool Event_wrapper::genPerms(vector<int>& cur, const vector<int>& part, int col)
{
	//Base case
	if (col == -1)
		return false;
		
	//Increment cur
	if(cur[col]+1 >= part[col]){
		cur[col] = 0;
		return genPerms(cur, part, col-1);
	}
	else
		cur[col]++;
		
	return true;
}

void Event_wrapper::insertTrans(string& event, int fsm, int dest)
{
	//Check for event index
	map<string, int>::iterator it = indexMap.find(event);
	if (it == indexMap.end())
	{
		//Insert entires in index hash and vector
		indexMap.insert(make_pair(event, eventArr.size()));
		Event_obj newCandEvent(event, fsm, dest);
		eventArr.push_back(newCandEvent);
	}
	else
	{
		//Update event object
		if(fsm != (eventArr[(it->second)].transitions.back()).first)
			eventArr[it->second].FSMcount++;
		eventArr[it->second].transitions.push_back(make_pair(fsm, dest));
	}
}

void Event_wrapper::getNextAddress(vector<unsigned long int>& nextStates, vector<string>& nextEvents, unsigned long int curState){	
	for(vector<Event_obj>::iterator it=eventArr.begin(); it!=eventArr.end(); it++)
	{
		if((eventMap.find((*it).event)->second) != (*it).FSMcount)
			continue;
		else if(it->FSMcount == it->transitions.size()){	
			nextStates.push_back(getAddr(curState, *it));
			nextEvents.push_back(it->event);
		}
		else{
			vector<int> partition;
			int index = (*it).transitions[0].first;
			int countP = 0;
			for(int iP=0; iP<(*it).transitions.size(); iP++){
				if((*it).transitions[iP].first == index)
					countP++;
				else{
					partition.push_back(countP);
					index = (*it).transitions[iP].first;
					countP=1;
				}
			}
			partition.push_back(countP);
					
			vector<int> currentPerm((*it).FSMcount-1, 0);
			currentPerm.push_back(-1);
					
			while(genPerms(currentPerm, partition, (*it).FSMcount-1)){
				Event_obj temp;
				int runSum = 0;
				for(int iP=0; iP<partition.size(); iP++){
					temp.transitions.push_back(it->transitions[runSum+currentPerm[iP]]);
					runSum+=partition[iP];
				}
						
				nextStates.push_back(getAddr(curState, temp));
				nextEvents.push_back(it->event);
			}
		}
	}
}

unsigned long int Event_wrapper::getAddr(unsigned long int cur, Event_obj& obj){
	for(vector<pair<int, int> >::iterator it=obj.transitions.begin(); it!=obj.transitions.end(); it++){
		unsigned long int mask = 0, newbits = 0;
		int fsmX = (*it).first;
		int dest = (*it).second;
		mask = ( ((1<<bits[fsmX])-1) << offset[fsmX] );
		newbits = dest << offset[fsmX];
		cur = (~mask & cur) | (mask & newbits);
	} 
	
	return cur;
}

void Event_wrapper::clear(void){
	indexMap.clear();
	eventArr.clear();
}


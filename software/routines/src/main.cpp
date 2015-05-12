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

#include "FSM.h"
#include "ParCompUtilities.h"

using namespace std;


int main(int argc, const char * argv[])
{

    FSM G1;
    G1.generateTransition("x0", "x1", "AB");
    G1.generateTransition("x0", "x2", "AB");
    G1.generateTransition("x1", "x0", "ab");
    G1.generateTransition("x1", "x0", "d");
    G1.markState("x0");
    G1.markState("x1");
    G1.markState("x2");

    FSM G2;
    G2.generateTransition("y0", "y1", "A");
    G2.generateTransition("y2", "y2", "d");
    G2.generateTransition("y1", "y2", "AB");
    G2.generateTransition("y2", "y3", "A");
    G2.generateTransition("y1", "y2", "c");
    G2.markState("y0");
    G2.markState("y2");

    
    FSM G3;
    G3.generateTransition("w0", "w1", "d");
    G3.generateTransition("w1", "w1", "AB");
    G3.markState("w0");

    //cout << "G1" << endl;
    //G1.printFSM();
    
    cout << "G123 using mulparcomp" << endl;
    
    vector<FSM> fsm;
	fsm.push_back(G1);
	fsm.push_back(G2);
	fsm.push_back(G3);
    FSM G123 = MultParComp(fsm);
	G123.printFSM();
//
//    cout << "G2" << endl;
//    G2.printFSM();
    
    
//    FSM G12 = PairParComp(G1, G2);
//    cout << "G12: ";
//    G12.printFSM();
//
//    FSM G123_pp = PairParComp(G12, G3);
//    cout << "G123_pp: ";
//    G123_pp.printFSM();

    return 0;

}


/*
* Programmer: Patrick Harding
* Purpose: To simulate a guessing game between human and computer for the rolling of 3 dice.
* Class: CS222
*
* ===========================================================================
* Used cmd to copy all output to runFile.txt
* ===========================================================================
*
* Assignment #1
*/

#include <iostream>
#include <ctime>
#include <iomanip>
#include <fstream>
#include <stdio.h>

using namespace std;

int rollDice()
{


    int rollSum = 0;
    int randNum;
    for(int i = 0; i < 3; i++)
    {
        randNum = rand() % 6 + 1;
        rollSum += randNum;

    }

    cout << "=====The Correct Answer is: " << rollSum;

    return rollSum;
}

int main() {
    srand((unsigned int)time(NULL));

    int userInp = 0;
    int compInp = 0;

    cout << "Hello, please guess the sum of 3 dice rolls(3-18)!\n";
    cin >> userInp;

    cout << "Now time for the computer to guess!\n";
    compInp = (rand() % 18) + 3;

    cout << "You guessed: " << userInp << "\nThe computer guessed: " << compInp << "\n";


    rollDice();

    int HumanWins[10] = {};
    int ComputerWins[10] = {};








    return 0;
}

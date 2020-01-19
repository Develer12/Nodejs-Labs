#pragma once
#include "stdafx.h"
#define SERVER_PORT 4000
#define SERVER_ADDRESS "127.0.0.1"

std::string GetErrorMsgText(int code);
std::string SetErrorMsgText(std::string msgText, int code);


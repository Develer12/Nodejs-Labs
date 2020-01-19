#pragma once
#include "stdafx.h"
#define CLIENT_PORT 4000
#define SERVER_ADDRESS "127.0.0.7"

std::string GetErrorMsgText(int code);
std::string SetErrorMsgText(std::string msgText, int code);

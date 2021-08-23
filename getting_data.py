from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from csv import DictReader

import selenium.webdriver
import pickle
import json
import time
import pathlib

from selenium import webdriver

options = webdriver.ChromeOptions()
# Path to your chrome profile
options.add_argument(
    "user-data-dir=D:\\Five-Coding-Projects\\2_Full_Stack_Web_Project\\selenium")
# Kinda works, need to understand which chrome profile to use.

w = webdriver.Chrome(
    executable_path="chromedriver.exe", options=options)

w.get("https://ui8.net/category/3d-assets")

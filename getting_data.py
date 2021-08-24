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
    "user-data-dir=C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data")
# Kinda works, need to understand which chrome profile to use.
# "user-data-dir=D:\\Five-Coding-Projects\\2_Full_Stack_Web_Project\\chrome-data")

# options.add_argument('--profile-directory=Default')

driver = webdriver.Chrome(
    executable_path="chromedriver.exe", options=options)

driver.get("https://blendermarket.com/creator/sales")

driver.execute_script("window.open('');")
driver.switch_to.window(driver.window_handles[1])

driver.get("https://ui8.net")

driver.execute_script("window.open('');")
driver.switch_to.window(driver.window_handles[2])

driver.get("https://www.cgtrader.com/")

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from csv import DictReader
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


import selenium.webdriver
import pickle
import json
import time
import pathlib

with open('login_details.json') as login_details:
    data = json.load(login_details)

options = webdriver.ChromeOptions()
# Path to your chrome profile
options.add_argument(
    "user-data-dir=D:\\Five-Coding-Projects\\2_Full_Stack_Web_Project\\selenium")
# Kinda works, need to understand which chrome profile to use.
# Selenium profile: D:\\Five-Coding-Projects\\2_Full_Stack_Web_Project\\selenium
# Main profile : C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data

# options.add_argument('--profile-directory=Default')

driver = webdriver.Chrome(
    executable_path="chromedriver.exe", options=options)


def get_info_UI8():

    # * Logging in on UI8
    # region

    try:
        driver.get("https://ui8.net/")
        print("Trying to log in on UI8")

        driver.implicitly_wait(15)

        driver.find_element_by_xpath(
            "/html/body/div[1]/header/div[2]/div[2]/a").click()

        email_input = driver.find_element_by_id("login-email")
        password_input = driver.find_element_by_id("login-password")

        email_input.send_keys(data["login"])
        password_input.send_keys(data["pw"])

        driver.find_element_by_id("login-button").click()

        print("Logged in on UI8")

    except:
        print("Login failed")


driver.get("https://blendermarket.com/creator/sales")

driver.execute_script("window.open('');")
driver.switch_to.window(driver.window_handles[1])

get_info_UI8()
driver.implicitly_wait(10)


driver.execute_script("window.open('');")
driver.switch_to.window(driver.window_handles[2])

driver.get("https://www.cgtrader.com/profile/sales#latest-sales")

driver.switch_to.window(driver.window_handles[1])

driver.get("https://ui8.net/affiliate/sales")

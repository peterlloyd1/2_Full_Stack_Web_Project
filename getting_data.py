from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from csv import DictReader

import selenium.webdriver
import pickle
import json
import time
import pathlib


with open('login_details.json') as login_details:
    data = json.load(login_details)

scriptDirectory = pathlib.Path().absolute()

chrome_options = Options()

chrome_options.add_argument("--user-data-dir=chrome-data")
# chrome_options.add_argument("user-data-dir=C:\environments\selenium")

driver = webdriver.Chrome("chromedriver.exe", options=chrome_options)
driver.get("https://ui8.net")  # Already authenticated
time.sleep(30)
driver.quit()

driver.refresh()
driver.get("https://ui8.net")


# def get_info_UI8():

#     # * Logging in on UI8
#     # region

#     try:
#         driver.get("https://ui8.net/")
#         print("Trying to log in on UI8")

#         driver.implicitly_wait(15)

#         driver.find_element_by_xpath(
#             "/html/body/div[1]/header/div[2]/div[2]/a").click()

#         email_input = driver.find_element_by_id("login-email")
#         password_input = driver.find_element_by_id("login-password")

#         email_input.send_keys(data["login"])
#         password_input.send_keys(data["pw"])

#         driver.find_element_by_id("login-button").click()

#         print("Logged in on UI8")

#     except:
#         print("Login failed")

#     # TODO: Just navigate to "https://ui8.net/account/signin?from=_affiliate_sales" and the login ?
#     # TODO: Better would be to maybe store my cookies and stay logged in?

#     # endregion

#     # driver.get("https://ui8.net/affiliate/sales")
#     # TODO: Storing the sales data in a JSON
#     # region
#     # TODO: Somehow need to get to this url https://ui8.net/affiliate/sales

#     # endregion

# # storing the cookies
# pickle.dump(driver.get_cookies(), open("cookies.pkl", "wb"))


# # loading the stored cookies
# cookies = pickle.load(open("cookies.pkl", "rb"))
# for cookie in cookies:
#     print("Adding ")
#     # adding the cookies to the session through webdriver instance
#     driver.add_cookie(cookie)
# driver.get('https://ui8.net')

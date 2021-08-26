from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


import json
import pickle

# importing passwords for UI8
with open('login_details.json') as login_details:
    data = json.load(login_details)

# path to your chrome profile ( Make sure you have logged into websites your accessing )
options = webdriver.ChromeOptions()
options.add_argument(
    "user-data-dir=D:\\Five-Coding-Projects\\2_Full_Stack_Web_Project\\selenium")

# selecting chrome path and options
driver = webdriver.Chrome(
    executable_path="chromedriver.exe", options=options)


# * Logging in on UI8
def get_info_UI8():

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


driver.get(
    "https://blendermarket.com/creator/sales?start_date=2021-01-01&end_date=2021-08-25")


# region Opening other sites
# driver.execute_script("window.open('');")
# driver.switch_to.window(driver.window_handles[1])

# get_info_UI8()
# driver.implicitly_wait(10)


# driver.execute_script("window.open('');")
# driver.switch_to.window(driver.window_handles[2])

# driver.get("https://www.cgtrader.com/profile/sales#latest-sales")

# driver.switch_to.window(driver.window_handles[1])

# driver.get("https://ui8.net/affiliate/sales")

# blendermarket = driver.window_handles[0]
# ui8 = driver.window_handles[1]
# cgtrader = driver.window_handles[2]

# driver.switch_to.window(blendermarket)

# endregion
# TODO: Loop trough blendermarket data tables and store the information
# TODO: Date, Product name, Amount before fees, Earnings after fees

sales_data = {
    "BlenderMarket": [
        {
            "date": str,
            "product_name": str,
            "customer": str,
            "amount": str,
            "earnings": str,
        }

    ]

}

# Saving all the items purchased
all_sales = driver.find_elements_by_xpath('//table/tbody/tr')

# Looping trough the sales list
for sale in all_sales:
    # Need to store each in a json now, under Blendermarket sales and then each individual

    # date = sale.find_element_by_xpath('td[1]').text
    # product_name = sale.find_element_by_xpath('td[3]').text
    # customer = sale.find_element_by_xpath('td[4]').text
    # amount = sale.find_element_by_xpath('td[5]').text
    # earnings = sale.find_element_by_xpath('td[9]').text

    sales_data["BlenderMarket"][1].append(date)
    date = sale.find_element_by_xpath('td[1]').text
    product_name = sale.find_element_by_xpath('td[3]').text
    customer = sale.find_element_by_xpath('td[4]').text
    amount = sale.find_element_by_xpath('td[5]').text
    earnings = sale.find_element_by_xpath('td[9]').text

sales_data.dump()

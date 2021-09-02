from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import datetime
from datetime import date

import json
import pickle

# importing passwords for UI8
with open('login_details.json') as login_details:
    data = json.load(login_details)

# getting todas date
todays_date = date.today().strftime("%Y-%m-%d")


# path to your chrome profile ( Make sure you have logged into websites your accessing )
options = webdriver.ChromeOptions()
options.add_argument(
    "user-data-dir=D:\\Five-Coding-Projects\\2_Full_Stack_Web_Project\\selenium")

# selecting chrome path and options
driver = webdriver.Chrome(
    executable_path="chromedriver.exe", options=options)


# * Logging in on UI8
def get_data_UI8():
    import time

    # logging in on UI
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

        # WebDriverWait(driver, 3).until(EC.presence_of_element_located(
        #     (By.XPATH, '/html/body/div[1]/header/div[2]/div[2]/a')))

        time.sleep(6)

        print("Logged in on UI8")

    except:
        print("Login failed")

    # getting the data from UI8
    try:
        print("Scrapping data from UI8")
        driver.get("https://ui8.net/affiliate/sales")
        time.sleep(2)
        all_sales_ui8 = driver.find_elements_by_xpath(
            '//html/body/div[3]/div[2]/div[1]/table/tbody/tr[1]/td[2]')

        print(driver.find_element_by_class_name("table table-striped"))

        print(all_sales_ui8)
        print(driver.find_element_by_xpath(
            "/html/body/div[3]/div[2]/div[1]/table/thead/tr/th[1]"))

        print("Finished scrapping  data from UI8")

    except:
        print("Could not Scrape data from UI8")


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


def get_data_blendermarket():

    driver.get(
        "https://blendermarket.com/creator/sales?start_date=2021-05-02&end_date=" + todays_date + "&sort_date=asc")

    jsonObj = []

    # Saving all the items purchased
    all_sales = driver.find_elements_by_xpath('//table/tbody/tr')

    print(len(all_sales))

    # Looping trough the sales list
    for idx, sale in enumerate(all_sales, start=1):

        # Need to store this data
        # TODO: Change the date output to (DAY/MONTH/YEAR)
        date = sale.find_element_by_xpath('td[1]').text
        purchase_id = sale.find_element_by_xpath('td[2]').text
        product_name = sale.find_element_by_xpath('td[3]').text
        customer = sale.find_element_by_xpath('td[4]').text
        amount = sale.find_element_by_xpath('td[5]').text
        earnings = sale.find_element_by_xpath('td[9]').text

        # changing date to be DAY/MONTH/YEAR
        new_date = datetime.datetime.strptime(
            str(date[:8]), '%m-%d-%y').strftime('%d/%m/%y')

        # Saving sales data
        jsonObj.append({
            "sale": idx,
            "pruchase_id": purchase_id,
            "date": new_date,
            "product_name": product_name,
            "customer_email": customer,
            "asking_price": amount,
            "revenue": earnings,
        },

        )

    print(jsonObj)

    # exporting sales data to json
    with open('blendermarket_sales.json', 'w') as f:
        json.dump(jsonObj, f, indent=4)


def get_data_cgtrader():
    import datetime

    jsonObj = []

    driver.get("https://www.cgtrader.com/profile/sales#latest-sales")

    # Saving all the items purchased
    all_sales_cgtrader = driver.find_elements_by_xpath('//table/tbody/tr')

    # Looping trough the sales list
    for idx, sale in enumerate(all_sales_cgtrader, start=1):

        # Need to store this data
        # TODO: Change the date output to (DAY/MONTH/YEAR)

        # Changing the date output to (DAY/MONTH/YEAR)
        date = sale.find_element_by_xpath('td[2]').text
        new_date = datetime.datetime.strptime(
            str(date), '%Y-%m-%d').strftime('%d/%m/%y')

        purchase_id = sale.find_element_by_xpath('td[1]').text
        product_name = sale.find_element_by_xpath('td[3]').text
        customer = sale.find_element_by_xpath('td[4]').text
        original_price = sale.find_element_by_xpath('td[6]').text
        sold_for = sale.find_element_by_xpath('td[7]').text
        earnings = sale.find_element_by_xpath('td[11]').text

        # Saving sales data
        jsonObj.append({
            "sale": idx,
            "pruchase_id": purchase_id,
            "date": new_date,
            "product_name": product_name,
            "customer_email": customer,
            "asking_price": sold_for,
            "revenue": earnings,
        })

        print("Old Date: " + date + "\n New date: " + new_date)

    print(jsonObj)

    # exporting sales data to json
    with open('cgtrader_sales.json', 'w') as f:
        json.dump(jsonObj, f, indent=4)


get_data_cgtrader()

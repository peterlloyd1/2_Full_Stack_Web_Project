from typing import Reversible
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

        time.sleep(7)

        print("Logged in on UI8")

    except:
        print("Login failed")

    # Getting the data from UI8
    try:

        print("Scrapping data from UI8")

        jsonOBJ = []
        page_counter = 2
        i = 1

        while page_counter >= 1:

            driver.get("https://ui8.net/affiliate/sales?page=" +
                       str(page_counter))

            # # Grabbing sales lenght
            # sales_lenght = driver.find_element_by_xpath(
            #     "/html/body/div[3]/div[2]/div[2]/div/h5[2]").text[:2]
            # print(sales_lenght)

            # creating manual idx counter

            # Saving all the items purchased
            all_sales = driver.find_elements_by_xpath('//table/tbody/tr')

            print(all_sales)

            for sale in reversed(all_sales):
                date = sale.find_element_by_xpath('td[2]').text
                product_name = sale.find_element_by_xpath('td[3]').text
                amount = sale.find_element_by_xpath('td[5]').text
                earnings = sale.find_element_by_xpath('td[6]').text

                print(date)

                print(i)

                # Changing the date output to (DAY/MONTH/YEAR)
                new_date = datetime.datetime.strptime(
                    str(date[:10]), '%m/%d/%Y').strftime('%d/%m/%y')

                print(i+new_date+amount+earnings)

                # Saving sales data
                jsonOBJ.append({
                    "sale": i,
                    "date": new_date,
                    "product_name": product_name,
                    "asking_price": amount,
                    "revenue": earnings,
                },
                )

                i += 1
                # # Creating the reverse index list
                # sales_lenght -= 1
                # print(sales_lenght)

            page_counter -= 1

        # TODO: After while loop finishes, go to all sales and save the "Pass" sales data
        print("Does code go here or not jet?")
        # exporting sales data to json
        with open('ui8_sales.json', 'w') as f:
            json.dump(jsonOBJ, f, indent=4)

        print(jsonOBJ)

        print("Finished scrapping data from UI8 ")

    except:
        print("Could not Scrape data from UI8")


def get_data_blendermarket():

    driver.get(
        "https://blendermarket.com/creator/sales?start_date=2021-05-02&end_date=" + todays_date + "&sort_date=asc")

    jsonObj = []

    # Saving all the items purchased
    all_sales = driver.find_elements_by_xpath('//table/tbody/tr')
    sales_lenght = driver.find_elements_by_xpath('//table/tbody')

    print(sales_lenght)

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

    # # exporting sales data to json
    # with open('blendermarket_sales.json', 'w') as f:
    #     json.dump(jsonObj, f, indent=4)


def get_data_cgtrader():
    import datetime
    import time

    jsonOBJ = []

    driver.get("https://www.cgtrader.com/profile/sales")

    # Saving all the items purchased
    all_sales_cgtrader = driver.find_elements_by_xpath('//table/tbody/tr')
    # Saving lenght of all purchases
    stop_looping = driver.find_elements_by_xpath('//table/tbody')
    list_lenght = len(stop_looping) + 3
    print(list_lenght)

    # Looping trough the sales list
    for idx, sale in enumerate(all_sales_cgtrader, start=1):

        # The list has emtys, so need to stop looping after len() of sales list +3 , this stupid but idn what to do
        if idx == len(stop_looping) + 3:
            break

        # Need to store this data
        date = sale.find_element_by_xpath('td[2]').text
        purchase_id = sale.find_element_by_xpath('td[1]').text
        product_name = sale.find_element_by_xpath('td[3]').text
        customer = sale.find_element_by_xpath('td[4]').text
        original_price = sale.find_element_by_xpath('td[6]').text
        sold_for = sale.find_element_by_xpath('td[7]').text
        earnings = sale.find_element_by_xpath('td[11]').text

        # Changing the date output to (DAY/MONTH/YEAR)
        new_date = datetime.datetime.strptime(
            str(date[:10]), '%Y-%m-%d').strftime('%d/%m/%y')

        # Creating the reverse index list
        list_lenght -= 1

        # Saving sales data
        jsonOBJ.append({
            "sale": list_lenght,
            "pruchase_id": purchase_id,
            "date": new_date,
            "product_name": product_name,
            "customer_email": customer,
            "asking_price": sold_for,
            "revenue": earnings,
        },
        )

    print(jsonOBJ)

    # exporting sales data to json
    with open('cgtrader_sales.json', 'w') as f:
        json.dump(jsonOBJ, f, indent=4)


get_data_UI8()

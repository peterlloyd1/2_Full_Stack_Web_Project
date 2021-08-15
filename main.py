from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

import json

with open('login_details.json') as login_details:
    data = json.load(login_details)

PATH = "C:\Program Files (x86)\chromedriver.exe"

driver = webdriver.Chrome(PATH)

driver.get("https://ui8.net/")

driver.implicitly_wait(15)

driver.find_element_by_xpath(
    "/html/body/div[1]/header/div[2]/div[2]/a").click()


email_input = driver.find_element_by_id("login-email")
password_input = driver.find_element_by_id("login-password")

email_input.send_keys(data["login"])
password_input.send_keys(data["pw"])

driver.find_element_by_id("login-button").click()


# driver.find_element_by_xpath("//*[@id="login-email"]").send_keys("peteris")

# driver.quit()

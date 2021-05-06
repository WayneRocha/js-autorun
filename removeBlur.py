try:
    from time import sleep
    from platform import system
    from selenium import webdriver
except Exception as error:
    print(f'não foi possivel importar as bibliotecas\n{error}')
finally:
    print(f'bibliotecas importadas')


def getWebDriver():
    os = system().lower()
    if os == 'windows':
        return webdriver.Chrome(executable_path=r'chromedriver_win32/chromedriver.exe')
    elif os == 'linux':
        return webdriver.Chrome(executable_path=r'chromedriver_linux64/chromedriver.exe')
    elif os == 'darwin':
        return webdriver.Chrome(executable_path=r'chromedriver_mac64/chromedriver.exe')


def openURL(url):
    browser.delete_all_cookies()
    try:
        browser.get(url)
    except:
        print('Não foi possivel conectar ao site\n\n')
        exit()


def removeBlur():
    script = '\n'.join(open('scriptJS.txt').readlines())
    browser.execute_script(script)


while True:
    link = input('copie e cole o link aqui: ').strip()
    if len(link) > 0:
        break
browser = getWebDriver()
openURL(link)
removeBlur()

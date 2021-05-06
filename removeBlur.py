try:
    from platform import system
    from selenium import webdriver
except Exception as error:
    print(f'não foi possivel importar as bibliotecas\n{error}')


def getWebDriver():
    print('obtendo o WebDriver...')
    os = system().lower()
    if os == 'windows':
        return webdriver.Chrome(executable_path=r'chromedriver_win32/chromedriver.exe')
    elif os == 'linux':
        return webdriver.Chrome(executable_path=r'chromedriver_linux64/chromedriver.exe')
    elif os == 'darwin':
        return webdriver.Chrome(executable_path=r'chromedriver_mac64/chromedriver.exe')


browser = getWebDriver()

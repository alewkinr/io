#!/usr/bin/python
# coding: utf-8
import requests
import psycopg2
from bs4 import BeautifulSoup
from configparser import ConfigParser


def get_html(url):
    r = requests.get(url)
    return r.text


def get_total_pages(html):
    total_pages = "0"
    soup = BeautifulSoup(html, "lxml")
    divs = soup.find("div", class_="col-md-12")  # контент
    if (soup.find("div", class_="pagination")) == None:
        try:
            if (
                soup.find(
                    "table",
                    class_="search-result-reestr table table-striped table-bordered table-hover",
                ).tr.th.text
                == "Исполнители"
            ):
                total_pages = "1"
        except:
            total_pages = "0"
    else:
        pages = (
            soup.find("div", class_="pagination").find_all("a")[-1].get("href")
        )  # последняя страница
        total_pages = pages.split("=")[4]  # кол-во страниц
    return int(total_pages)


def get_page_data(html):
    soup = BeautifulSoup(html, "lxml")
    data = []
    table = soup.find(
        "table",
        attrs={
            "class": "search-result-reestr table table-striped table-bordered table-hover"
        },
    )
    rows = table.find_all("tr")
    for row in rows:
        cols = row.find_all("td")
        cols = [ele.text.rstrip() for ele in cols]
        if cols:
            data.append(cols)
    # print(data)
    return data


def config(filename="config.ini", section="postgresql"):
    parser = ConfigParser()
    parser.read(filename)
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(
            'Параметры подключения к бд не найдены в файле конфигурации "{0}" '.format(
                filename
            )
        )
    return db


def data_load():
    params = config()
    print("Подключение к БД")
    conn = psycopg2.connect(**params)
    conn.autocommit = True
    cur = conn.cursor()
    sql = """insert into info.history_load (info) values ('Старт обновления данных в справочнике ВОИС ' || now() || '
    ');"""
    cur.execute(sql)
    sql = """ update info.history_load SET info = 'Флаги в справочнике ВОИС сброшены ' || now() || '
    ' || coalesce(info, '') WHERE id = (select max(id) from info.history_load);"""
    cur.execute(sql)
    # url = 'http://rosvois.ru/reestr/?name_music=а&executors=&manufacturer='
    url1 = "http://rosvois.ru/reestr/"
    url2 = "/?name_music=а"
    url3 = "&executors=&manufacturer="
    url = url1 + url2 + url3
    # total_pages = 1 #заглушка пока
    html = get_html(url)
    total_pages = get_total_pages(html)
    print(
        "Парсинг по url="
        + url
        + "\n"
        + "total_pages---------------------"
        + str(total_pages)
    )
    for p in range(1, total_pages + 1):
        url_page = url1 + str(p) + url2 + url3
        print("\n url_page=" + url_page + "\n")
        html = get_html(url_page)
        data = get_page_data(html)
        # 3 заливка данных с этой страницы
        for row in data:
            sql = """select info.data_load_row_processing(%s, %s, %s, %s, %s, %s, %s, %s, %s);"""
            cur.execute(sql, tuple(row))

    print("*****************************************")
    print("Загрузка закончена")
    cur.close()
    conn.close()


data_load()

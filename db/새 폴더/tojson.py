import csv
from os import rename

while 1:
    name = input('파일명을 입력해주세요 : ')
    if name == "q": quit()
    f = open(name + '.csv', 'r')
    w = open(name + '.txt', 'w', encoding='UTF-8')
    rr = csv.reader(f)
    w.write('[\n')

    hd = 1
    nextline = ''
    for line in rr:
        if hd: header = line; hd = 0
        else:
            if nextline: w.write(nextline + '\n')
            w.write('    {\n')
            for j in range(len(line)):
                data = ' ' * 8 + '"' + header[j]  +'" : '
                if line[j].isdigit(): data += line[j]
                else: data += '"' + line[j] + '"'
                if j != len(line) - 1: data += ','
                data += '\n'
                w.write(data)
            nextline = '    },'
    nextline = nextline[:-1] + '\n'
    w.write(nextline)
    w.write(']')
    f.close()
    w.close()
    rename(name + '.txt', name + '.json')
    print("생성완료!")
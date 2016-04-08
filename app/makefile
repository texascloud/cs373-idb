FILES :=                              \
    models.html             \
    IDB1.log              \
    run.py                            \
    tests.out                         \
    tests.py

models.html: models.py
	pydoc3 -w models.py

IDB1.log:
	git log > IDB1.log

IDB2.log:
	git log > IDB2.log

IDB3.log:
	git log > IDB3.log	

# RunCollatz.tmp: RunCollatz.in RunCollatz.out RunCollatz.py
# 	./RunCollatz.py < RunCollatz.in > RunCollatz.tmp
# 	diff RunCollatz.tmp RunCollatz.out

tests.tmp: tests.py
	coverage3 run    --include="./*" --branch tests.py >  tests.tmp 2>&1
	coverage3 report -m                      >> tests.tmp
	cat tests.tmp

check:
	@not_found=0;                                 \
    for i in $(FILES);                            \
    do                                            \
        if [ -e $$i ];                            \
        then                                      \
            echo "$$i found";                     \
        else                                      \
            echo "$$i NOT FOUND";                 \
            not_found=`expr "$$not_found" + "1"`; \
        fi                                        \
    done;                                         \
    if [ $$not_found -ne 0 ];                     \
    then                                          \
        echo "$$not_found failures";              \
        exit 1;                                   \
    fi;                                           \
    echo "success";

clean:
	rm -f  .coverage
	rm -f  *.pyc
	rm -rf server/__pycache__
	rm -rf __pycache__
	rm -f  tests.tmp

config:
	git config -l

html: GamesObservatory.html

log: GamesObservatory.log

scrub:
	make clean
	rm -f  GamesObservatory.html
	rm -f  GamesObservatory.log

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

test: tests.tmp

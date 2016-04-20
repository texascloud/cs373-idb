FILES :=                              \
    models.html             \
    IDB2.log              \
    apiary.apib			\
    app/models.py                            \
    app/tests.py 			\
    UML.pdf

models.html: app/models.py
	cd app; pydoc3 -w models.py; mv models.html ../models.html

IDB1.log:
	git log > IDB1.log

IDB2.log:
	git log > IDB2.log

IDB3.log:
	git log > IDB3.log	

tests.tmp: app/tests.py
	coverage3 run    --include="app/*" --branch app/tests.py >  app/tests.tmp 2>&1
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
	rm -rf app/server/__pycache__
	rm -rf app/__pycache__
	rm -f  app/tests.tmp

config:
	git config -l

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

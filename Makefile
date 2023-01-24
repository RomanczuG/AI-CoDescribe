########################################################################
####################### Makefile Template ##############################
########################################################################

rS: $(APPNAME)
	python3 serverApp.py

rC: $(APPNAME)
	cd client && npm run dev

push:
	git add .
	git commit -m "pushing"
	git push


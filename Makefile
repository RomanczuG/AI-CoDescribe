########################################################################
####################### Makefile Template ##############################
########################################################################

runServer: $(APPNAME)
	python3 serverApp.py

runClient: $(APPNAME)
	cd client && npm run dev

push:
	git add .
	git commit -m "pushing"
	git push


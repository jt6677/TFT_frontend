main:	
	git add .
	git commit -m 'commit'
	git push origin main	

d:
	pnpm run dev


build:
	pnpm run build

latest:
	git for-each-ref --sort=-committerdate refs/heads/ --format="%(refname:short)" | grep -v '^main' | head -n 1


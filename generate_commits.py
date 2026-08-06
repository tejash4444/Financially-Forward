import os
import random
import subprocess
from datetime import datetime, timedelta

YEAR = 2026

def run_cmd(cmd, env=None):
    subprocess.run(cmd, shell=True, check=True, env=env)

def commit_empty_on_date(date_obj):
    date_str = date_obj.strftime("%Y-%m-%dT12:00:00")
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = date_str
    env["GIT_COMMITTER_DATE"] = date_str
    
    # Run empty commit
    run_cmd(f'git commit --allow-empty -m "Graph commit for {date_obj.strftime("%Y-%m-%d")}"', env=env)

def main():
    # 1. Initial commit for the repo
    try:
        run_cmd('git add .')
        run_cmd('git commit -m "Initial commit"')
    except subprocess.CalledProcessError:
        print("Initial commit might already exist or nothing to commit.")

    # 2. Generate continuous July and August
    start_july = datetime(YEAR, 7, 1)
    end_aug = datetime(YEAR, 8, 31)

    curr = start_july
    continuous_dates = []
    while curr <= end_aug:
        continuous_dates.append(curr)
        curr += timedelta(days=1)

    # 3. Generate 30 random days in April, May, June
    start_april = datetime(YEAR, 4, 1)
    end_june = datetime(YEAR, 6, 30)

    curr = start_april
    amj_dates = []
    while curr <= end_june:
        amj_dates.append(curr)
        curr += timedelta(days=1)

    random_amj = random.sample(amj_dates, 30)
    
    # Sort all dates to make the git history chronological
    all_dates = sorted(continuous_dates + random_amj)

    print(f"Generating {len(all_dates)} commits...")
    for d in all_dates:
        commit_empty_on_date(d)
        
    print("Commits generated successfully. Now renaming branch and pushing.")
    
    # 4. Rename branch to main
    try:
        run_cmd('git branch -M main')
    except Exception as e:
        print(f"Error renaming branch: {e}")
        
    # 5. Push to remote
    try:
        run_cmd('git push -u origin main')
    except Exception as e:
        print(f"Error pushing to remote: {e}")

if __name__ == "__main__":
    main()

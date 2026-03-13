# 🚀 Getting Started — Step-by-Step Beginner Guide

> **You asked:** *"now tell me step by step what to do first"*
>
> This guide walks you through **everything** from scratch — even if you have never written a single line of Python before. Follow each step in order and you will have your first data science project running in about 15 minutes.

---

## 🗺️ Overview of Steps

| # | What you will do | Time needed |
|---|-----------------|-------------|
| 1 | Install Python | ~5 min |
| 2 | Install VS Code (recommended editor) | ~3 min |
| 3 | Download this project | ~2 min |
| 4 | Install the required Python libraries | ~2 min |
| 5 | Open and run the Jupyter Notebook | ~3 min |
| 6 | Explore the notebook cell by cell | Your pace |

---

## Step 1 — Install Python 🐍

Python is the programming language we use for data science.

1. Open your web browser and go to **https://www.python.org/downloads/**
2. Click the big yellow **"Download Python 3.x.x"** button (the latest version).
3. Run the installer you downloaded.
4. ⚠️ **IMPORTANT:** On the very first screen of the installer, tick the checkbox that says **"Add Python to PATH"** before clicking Install Now.

   ```
   ☑  Add Python 3.x to PATH   ← make sure this is checked!
   ```

5. Click **"Install Now"** and wait for it to finish.
6. Click **"Close"** when done.

### ✅ Check it worked

Open a terminal / command prompt:
- **Windows:** press `Win + R`, type `cmd`, press Enter
- **Mac:** press `Cmd + Space`, type `Terminal`, press Enter
- **Linux:** press `Ctrl + Alt + T`

Type this and press Enter:

```bash
python --version
```

You should see something like `Python 3.12.0`. If you do — Python is installed! 🎉

---

## Step 2 — Install VS Code (Recommended Editor) 💻

VS Code is a free, beginner-friendly code editor made by Microsoft.

1. Go to **https://code.visualstudio.com/**
2. Click **"Download for Windows/Mac/Linux"** (it detects your OS automatically).
3. Run the installer and follow the prompts (all defaults are fine).
4. Open VS Code once installed.
5. Inside VS Code, click the **Extensions** icon on the left sidebar (looks like four squares).
6. Search for **"Python"** and install the extension by Microsoft.
7. Search for **"Jupyter"** and install the Jupyter extension by Microsoft.

> **Alternative:** If you prefer not to use VS Code, you can use Jupyter in your browser — we cover that in Step 5.

---

## Step 3 — Download This Project 📥

You have two options:

### Option A — Download as ZIP (easiest, no Git needed)

1. Go to the GitHub repository page in your browser.
2. Click the green **"< > Code"** button near the top right.
3. Click **"Download ZIP"**.
4. Open your Downloads folder and extract/unzip the downloaded file.
5. Move the extracted folder somewhere easy to find, e.g., your Desktop or Documents.

### Option B — Clone with Git (recommended for long-term use)

If you have Git installed (`git --version` to check), run:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

> **Don't have Git?** Download it from **https://git-scm.com/downloads** and re-run the command above.

---

## Step 4 — Install the Required Python Libraries 📦

Libraries are add-ons that give Python extra powers (like drawing charts or working with spreadsheets). We need to install four of them.

1. Open your terminal / command prompt (see Step 1 for how).
2. Navigate to the project folder:

   ```bash
   # Windows example (adjust the path to where you extracted the project):
   cd C:\Users\YourName\Desktop\Abdullah-Gufran

   # Mac/Linux example:
   cd ~/Desktop/Abdullah-Gufran
   ```

3. Run this single command to install everything at once:

   ```bash
   pip install -r requirements.txt
   ```

   You will see a lot of text scroll by — that is normal. Wait until you see a line that ends with **"Successfully installed …"**.

4. ✅ Check the four key libraries are available:

   ```bash
   python -c "import pandas, numpy, matplotlib, seaborn; print('All libraries installed!')"
   ```

   You should see: `All libraries installed!`

---

## Step 5 — Open the Jupyter Notebook 📓

A Jupyter Notebook is like an interactive document where you can write code, run it, and see the results (including charts) all in one place. It is perfect for learning data science.

### Option A — Open inside VS Code (recommended)

1. Open VS Code.
2. Click **File → Open Folder** and select the `Abdullah-Gufran` project folder.
3. In the left panel (Explorer), click on **`netflix_analysis.ipynb`**.
4. VS Code will open the notebook. You will see cells with code in them.
5. At the top right, VS Code may ask you to **"Select Kernel"** — choose **Python 3**.

### Option B — Open in your browser

1. In your terminal, make sure you are inside the project folder (Step 4, point 2).
2. Run:

   ```bash
   jupyter notebook
   ```

3. A browser tab will open automatically showing a file list.
4. Click **`netflix_analysis.ipynb`** to open the notebook.

---

## Step 6 — Run the Notebook Cell by Cell ▶️

A notebook is made of **cells**. Each cell contains a piece of code. You run them one by one, from top to bottom.

### How to run a cell

- **VS Code:** Click inside the cell, then click the ▶ (play) button on the left.
- **Browser:** Click inside the cell, then press **`Shift + Enter`**.

### The correct order

Run the cells **in order from top to bottom**. Never skip a cell — each one depends on the ones above it.

```
Cell 1: import libraries       ← run this first
Cell 2: load the CSV file      ← then this
Cell 3: look at first 5 rows   ← then this
...and so on
```

### What to expect

After you run a cell, the output appears directly below it. For example:
- After "load the dataset" you will see: `Dataset shape: 100 rows × 14 columns`
- After a chart cell, you will see a colourful chart.

---

## 🆘 Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| `python` is not recognized | Reinstall Python and tick "Add to PATH" (Step 1) |
| `pip` is not recognized | Run `python -m pip install -r requirements.txt` instead |
| `ModuleNotFoundError: No module named 'pandas'` | Run `pip install pandas` in your terminal |
| `FileNotFoundError: netflix_top_shows_2023.csv` | Make sure your terminal is inside the project folder (Step 4, point 2) |
| Jupyter does not open | Run `pip install jupyter` then try again |
| VS Code says "Select Kernel" and nothing appears | Click "Select Kernel" → "Install suggested extensions" → choose Python 3 |

---

## 📋 Quick Checklist

Use this checklist to track your progress:

- [ ] **Step 1** — Python installed and `python --version` works
- [ ] **Step 2** — VS Code installed with Python + Jupyter extensions
- [ ] **Step 3** — Project folder downloaded and extracted
- [ ] **Step 4** — `pip install -r requirements.txt` ran successfully
- [ ] **Step 5** — `netflix_analysis.ipynb` opened in VS Code or browser
- [ ] **Step 6** — First cell (import libraries) runs without errors
- [ ] 🎉 **Done!** — You are now a data scientist in training!

---

## 🧭 What Comes Next?

Once the notebook is running, work through it section by section:

1. **Section 1–2** (Setup + Load): Just run the cells — nothing to change yet.
2. **Section 3** (Explore): Read the output carefully. What do you notice?
3. **Section 4** (Clean): This is where you fix messy data — very important skill!
4. **Section 5** (EDA): Answer questions about the data using code.
5. **Section 6** (Visualize): Create charts and share them!
6. **Section 8** (Exercises): Try the practice challenges on your own.

When you feel confident, try these next projects:
- 📊 Analyse a different dataset from [Kaggle](https://www.kaggle.com/datasets)
- 🤖 Build a simple prediction model with `scikit-learn`
- 🌐 Share your notebook on GitHub so others can see your work

---

## 💬 Need Help?

If you get stuck:
1. Read the error message carefully — it usually tells you exactly what went wrong.
2. Search the error message on [Stack Overflow](https://stackoverflow.com).
3. Ask in the repository's Issues section.

**You've got this! Every expert was once a beginner. 🌟**

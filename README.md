# 🎬 Netflix Shows & Movies Data Analysis
### A Beginner Data Science Project

This is a **beginner-friendly** data science project that analyzes Netflix TV shows and movies — including ratings, views, seasons, genres, and more.

---

## 📌 What This Project Covers

| Step | Topic |
|------|-------|
| 1 | Import Python libraries (pandas, matplotlib, seaborn) |
| 2 | Load and explore the dataset |
| 3 | Clean the data (missing values, duplicates) |
| 4 | Analyze content type distribution (TV Shows vs Movies) |
| 5 | Study ratings (IMDb & Netflix ratings) |
| 6 | Analyze views — most watched titles |
| 7 | TV Show season analysis |
| 8 | Genre analysis |
| 9 | Country & language breakdown |
| 10 | Correlation analysis (heatmap) |
| 11 | Final summary dashboard |

---

## 📂 Project Files

```
├── netflix_analysis.ipynb   ← Main Jupyter notebook (start here!)
├── netflix_data.csv         ← Sample dataset (50 Netflix titles)
├── requirements.txt         ← Python packages needed
└── README.md                ← This file
```

---

## 🚀 How to Run

### Option 1: Run on Google Colab (Easiest — no installation needed)
1. Go to [Google Colab](https://colab.research.google.com/)
2. Click **File → Upload notebook**
3. Upload `netflix_analysis.ipynb`
4. Also upload `netflix_data.csv`
5. Run each cell with **Shift + Enter**

### Option 2: Run Locally
1. Make sure you have Python 3.8+ installed
2. Install required libraries:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch Jupyter Notebook:
   ```bash
   jupyter notebook netflix_analysis.ipynb
   ```
4. Run each cell with **Shift + Enter**

---

## 📊 Dataset Description

The dataset (`netflix_data.csv`) contains **50 Netflix titles** with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| `title` | Name of the show/movie | Stranger Things S4 |
| `type` | TV Show or Movie | TV Show |
| `genre` | Genre(s) | Sci-Fi/Horror |
| `release_year` | Year released | 2022 |
| `season` | Season number (0 for movies) | 4 |
| `imdb_rating` | IMDb rating (0–10) | 8.7 |
| `netflix_rating` | Netflix rating (0–5) | 4.8 |
| `views_millions` | Total views in millions | 1352.0 |
| `duration_minutes` | Length of each episode/movie | 75 |
| `country` | Country of production | USA |
| `language` | Language | English |
| `age_rating` | Age rating | TV-14 |

---

## 📈 Sample Charts Generated

- 🍕 **Pie Chart** — TV Shows vs Movies
- 📊 **Bar Charts** — Top genres, countries, seasons
- 📉 **Histograms** — Rating distribution
- 📈 **Line Chart** — Rating trend across seasons
- 🔵 **Scatter Plot** — Rating vs Views
- 🌡️ **Heatmap** — Correlation between metrics
- 🖼️ **Dashboard** — All key charts in one view

---

## 🧠 Key Findings

1. **TV Shows** attract significantly more views than Movies on Netflix
2. **Higher-rated shows** tend to have more viewers
3. **Season 1** shows get the most views (curiosity factor)
4. **Drama** and **Action** are the most common Netflix genres
5. **Non-English content** (like Squid Game) can rival English content in viewership

---

## 🛠️ Technologies Used

- **Python 3** — Main programming language
- **Pandas** — Data manipulation
- **NumPy** — Numerical operations
- **Matplotlib** — Data visualization
- **Seaborn** — Statistical data visualization
- **Jupyter Notebook** — Interactive coding environment

---

## 👨‍🎓 About This Project

This project was created as a **beginner data science tutorial** for students who are new to Python and data analysis. Every step is clearly explained with comments in the notebook.

*Happy Learning! 🚀*
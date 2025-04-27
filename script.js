// Ambil data dari localStorage saat halaman dibuka
window.onload = function () {
    const saved = JSON.parse(localStorage.getItem("sampahData")) || [];
    total = 0;
    saved.forEach(data => {
      const item = document.createElement("li");
      item.textContent = `${data.jenis} - ${data.jumlah} kg`;
      document.getElementById("dataSampah").appendChild(item);
      total += data.jumlah;
    });
    document.getElementById("totalSampah").textContent = total.toFixed(1);
    document.getElementById("progressBar").style.width = Math.min((total / 10) * 100, 100) + "%";
    if (total >= 10) {
      document.getElementById("rewardMsg").textContent = "Keren! Kamu sudah mengumpulkan lebih dari 10 kg!";
    }
  };
  
  // Tambahkan simpanan ke localStorage saat tambah data
  function tambahData(event) {
    event.preventDefault();
    const jenis = document.getElementById("jenisSampah").value;
    const jumlah = parseFloat(document.getElementById("jumlah").value);
    if (isNaN(jumlah) || jumlah <= 0) return;
  
    const list = document.getElementById("dataSampah");
    const item = document.createElement("li");
    item.textContent = `${jenis} - ${jumlah} kg`;
    list.appendChild(item);
  
    total += jumlah;
    document.getElementById("totalSampah").textContent = total.toFixed(1);
    document.getElementById("progressBar").style.width = Math.min((total / 10) * 100, 100) + "%";
  
    if (total >= 10) {
      document.getElementById("rewardMsg").textContent = "Keren! Kamu sudah mengumpulkan lebih dari 10 kg!";
    }
  
    // Simpan ke localStorage
    const oldData = JSON.parse(localStorage.getItem("sampahData")) || [];
    oldData.push({ jenis, jumlah });
    localStorage.setItem("sampahData", JSON.stringify(oldData));
  
    document.getElementById("jenisSampah").value = "";
    document.getElementById("jumlah").value = "";
  }
  const kuisData = [
    {
      soal: "Sampah manakah yang termasuk organik?",
      opsi: ["Botol plastik", "Kulit pisang", "Kaleng bekas"],
      jawaban: "Kulit pisang"
    },
    {
      soal: "Benda berikut ini termasuk sampah B3?",
      opsi: ["Kertas bekas", "Baterai bekas", "Daun kering"],
      jawaban: "Baterai bekas"
    },
    {
      soal: "Apa manfaat mendaur ulang plastik?",
      opsi: ["Menambah polusi", "Mengurangi limbah", "Membuang sampah lebih cepat"],
      jawaban: "Mengurangi limbah"
    }
  ];
  
  let soalIndex = 0;
  
  function mulaiKuis() {
    soalIndex = 0;
    tampilkanSoal();
    document.getElementById("feedback").textContent = "";
  }
  
  function tampilkanSoal() {
    const pertanyaan = kuisData[soalIndex];
    document.getElementById("pertanyaan").textContent = pertanyaan.soal;
    const pilihan = document.getElementById("pilihan");
    pilihan.innerHTML = "";
  
    pertanyaan.opsi.forEach(opsi => {
      const btn = document.createElement("button");
      btn.textContent = opsi;
      btn.onclick = () => cekJawaban(opsi);
      pilihan.appendChild(btn);
    });
  }
  
  function cekJawaban(pilihanUser) {
    const benar = kuisData[soalIndex].jawaban;
    const feedback = document.getElementById("feedback");
    if (pilihanUser === benar) {
      feedback.textContent = "Benar!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Salah! Jawaban yang benar: ${benar}`;
      feedback.style.color = "red";
    }
  
    soalIndex++;
    if (soalIndex < kuisData.length) {
      setTimeout(() => {
        feedback.textContent = "";
        tampilkanSoal();
      }, 1500);
    } else {
      setTimeout(() => {
        document.getElementById("pertanyaan").textContent = "Kuis selesai! Kamu hebat!";
        document.getElementById("pilihan").innerHTML = "";
        feedback.textContent = "";
      }, 1500);
    }
  }
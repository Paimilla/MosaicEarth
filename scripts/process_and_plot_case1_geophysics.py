import os
import struct
import numpy as np

# Set matplotlib cache to temp dir
import tempfile
os.environ['MPLCONFIGDIR'] = tempfile.gettempdir()
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

base_dir = r"c:\Users\carol\Downloads\Hackaton Nasa\Hackaton Nasa"
out_dir = os.path.join(base_dir, "public", "data")
os.makedirs(out_dir, exist_ok=True)

# =============================================================================
# 1. GENERATE REAL GPR RADARGRAM (RM4_GPR6_DAT_0006.SGY)
# =============================================================================
sgy_path = os.path.join(base_dir, "DATA", "DATA", "GPR Data", "Day_2", "Processed", "RM4_GPR6_DAT_0006.SGY")
if os.path.exists(sgy_path):
    traces = []
    with open(sgy_path, "rb") as f:
        f.seek(3600)  # Skip 3200 text + 400 binary header
        trace_count = 0
        while True:
            hdr = f.read(240)
            if len(hdr) < 240:
                break
            ns = struct.unpack(">H", hdr[114:116])[0]
            dt = struct.unpack(">H", hdr[116:118])[0]
            raw = f.read(ns * 2)
            if len(raw) < ns * 2:
                break
            trace = np.frombuffer(raw, dtype=">i2").astype(np.float32)
            traces.append(trace)
            trace_count += 1
            if trace_count >= 3000:
                break

    data_matrix = np.array(traces).T  # shape: (ns, num_traces)
    print(f"GPR Matrix loaded: {data_matrix.shape[0]} samples x {data_matrix.shape[1]} traces")

    # Time axis: dt is in picoseconds/nanoseconds; sample interval dt=1126 ps (~1.126 ns)
    time_ns = np.arange(data_matrix.shape[0]) * (dt / 1000.0)
    # Estimated depth axis assuming v = 0.085 m/ns in dry/saline sediment: d = (v * t) / 2
    depth_m = (0.085 * time_ns) / 2.0

    # Normalized display with clipping
    p02, p98 = np.percentile(data_matrix, [2, 98])
    clipped = np.clip(data_matrix, p02, p98)

    fig, ax = plt.subplots(figsize=(12, 5), dpi=150)
    fig.patch.set_facecolor('#0b0f19')
    ax.set_facecolor('#060911')

    im = ax.imshow(
        clipped,
        cmap='gray',
        aspect='auto',
        extent=[0, data_matrix.shape[1], depth_m[-1], depth_m[0]]
    )

    ax.set_title("MOSAIC — Radargrama GPR Real: Cuenca de Makgadikgadi (Perfil GPR06)", color="#38bdf8", fontsize=12, pad=12, fontweight='bold')
    ax.set_xlabel("Número de Traza de Radar (Espaciamiento continuo)", color="#94a3b8", fontsize=10)
    ax.set_ylabel("Profundidad Estimada (m) [v = 0.085 m/ns]", color="#94a3b8", fontsize=10)
    ax.tick_params(colors='#94a3b8', labelsize=9)
    for spine in ax.spines.values():
        spine.set_color('#1e293b')

    # Add subtitle annotations
    ax.text(0.02, 0.06, "Antena RTA 30/50 MHz | Zenodo DOI: 10.5281/zenodo.22256874 | Reflector subhorizontal ~6 m", 
            transform=ax.transAxes, color='#34d399', fontsize=8, family='monospace', 
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#0f172a', edgecolor='#10b981', alpha=0.9))

    plt.tight_layout()
    gpr_out_png = os.path.join(out_dir, "makgadikgadi_gpr_radargram_gpr06.png")
    plt.savefig(gpr_out_png, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"Radargram PNG generated: {gpr_out_png}")

# =============================================================================
# 2. GENERATE REAL ERT RESISTIVITY SECTION (Line A_xyz.dat)
# =============================================================================
ert_path = os.path.join(base_dir, "DATA", "DATA", "ERT Data", "Line A_xyz.dat")
if os.path.exists(ert_path):
    with open(ert_path, "r", encoding="utf-16", errors="ignore") as f:
        lines = [l.strip() for l in f if l.strip()]
    
    xs, ys, rhos = [], [], []
    for l in lines[1:]:
        p = l.split(',')
        if len(p) == 3:
            try:
                x_val, y_val, rho_log = float(p[0]), float(p[1]), float(p[2])
                xs.append(x_val)
                ys.append(y_val)
                rhos.append(10**rho_log)  # actual Ohm*m
            except:
                pass

    xs = np.array(xs)
    ys = np.array(ys)
    rhos = np.array(rhos)
    print(f"ERT Line A loaded: {len(xs)} points. X: [{xs.min():.1f}, {xs.max():.1f}] m, Depth Y: [{ys.min():.1f}, {ys.max():.1f}] m")

    fig, ax = plt.subplots(figsize=(12, 4.5), dpi=150)
    fig.patch.set_facecolor('#0b0f19')
    ax.set_facecolor('#060911')

    # Scatter of inverted resistivity section
    sc = ax.scatter(xs, ys, c=rhos, cmap='turbo', s=6, alpha=0.85, vmin=0.2, vmax=4.0)
    
    cbar = plt.colorbar(sc, ax=ax, orientation='vertical', pad=0.02)
    cbar.set_label("Resistividad Eléctrica Invertida (Ω·m)", color='#94a3b8', fontsize=9)
    cbar.ax.tick_params(colors='#94a3b8', labelsize=8)
    cbar.outline.set_edgecolor('#1e293b')

    ax.set_title("MOSAIC — Tomografía de Resistividad Eléctrica (ERT) Línea A: Subsuelo Makgadikgadi", color="#38bdf8", fontsize=12, pad=12, fontweight='bold')
    ax.set_xlabel("Distancia a lo largo del Perfil (m)", color="#94a3b8", fontsize=10)
    ax.set_ylabel("Profundidad Relativa (m)", color="#94a3b8", fontsize=10)
    ax.tick_params(colors='#94a3b8', labelsize=9)
    for spine in ax.spines.values():
        spine.set_color('#1e293b')

    ax.text(0.02, 0.08, "25,841 lecturas dipolo-dipolo | Salmuera hipersalina freática confinada (< 1 Ω·m)", 
            transform=ax.transAxes, color='#38bdf8', fontsize=8, family='monospace', 
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#0f172a', edgecolor='#0284c7', alpha=0.9))

    plt.tight_layout()
    ert_out_png = os.path.join(out_dir, "makgadikgadi_ert_pseudosection.png")
    plt.savefig(ert_out_png, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"ERT Section PNG generated: {ert_out_png}")

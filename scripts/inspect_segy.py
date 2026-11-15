import os
import struct

def parse_segy(path):
    with open(path, 'rb') as f:
        text_hdr = f.read(3200)
        # Try ascii, latin1, or ebcdic
        try:
            ascii_text = text_hdr.decode('ascii')
        except:
            try:
                ascii_text = text_hdr.decode('cp500')
            except:
                ascii_text = text_hdr.decode('latin1', errors='replace')
        
        bin_hdr = f.read(400)
        dt = struct.unpack('>H', bin_hdr[16:18])[0]
        ns = struct.unpack('>H', bin_hdr[20:22])[0]
        fmt = struct.unpack('>H', bin_hdr[24:26])[0]
        
        trace_hdr = f.read(240)
        trace_dt = struct.unpack('>H', trace_hdr[116:118])[0] if len(trace_hdr) >= 118 else None
        trace_ns = struct.unpack('>H', trace_hdr[114:116])[0] if len(trace_hdr) >= 116 else None
        
        file_size = os.path.getsize(path)
        bytes_per_sample = 4 if fmt in [1, 2, 5] else 2
        trace_size = 240 + (trace_ns or ns) * bytes_per_sample
        num_traces = (file_size - 3600) // trace_size if trace_size > 0 else 0
        
        # Look for printable strings in the text header
        clean_text = "".join(c if 32 <= ord(c) < 127 or c == '\n' else ' ' for c in ascii_text)
        words = [w for w in clean_text.split() if len(w) > 2]
        
        return {
            'path': path,
            'file_name': os.path.basename(path),
            'dt_bin': dt,
            'ns_bin': ns,
            'fmt_code': fmt,
            'trace_dt': trace_dt,
            'trace_ns': trace_ns,
            'num_traces': num_traces,
            'file_size': file_size,
            'header_words': " ".join(words[:40])
        }

base_dir = r"c:\Users\carol\Downloads\Hackaton Nasa\Hackaton Nasa\DATA\DATA\GPR Data"
for root, dirs, files in os.walk(base_dir):
    for f in sorted(files):
        if f.endswith('.SGY'):
            p = os.path.join(root, f)
            info = parse_segy(p)
            rel = os.path.relpath(p, base_dir)
            print(f"[{rel}]")
            print(f"  Traces: {info['num_traces']} | Samples/trace: {info['trace_ns']} | dt: {info['trace_dt']} us/ns | Fmt: {info['fmt_code']}")
            if info['header_words']:
                print(f"  Header text: {info['header_words'][:120]}")
            print()

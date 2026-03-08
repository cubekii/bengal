use std::ffi::CStr;
use std::os::raw::c_char;

pub const NATIVE_BENGAL_PRINT: u8 = 0;
pub const NATIVE_BENGAL_PRINTLN: u8 = 1;

pub fn get_native(name: &str) -> Option<NativeFn> {
    match name {
        "print" => Some(native_print),
        _ => None,
    }
}

pub type NativeFn = fn(&mut Vec<String>) -> Result<(), String>;

fn native_print(args: &mut Vec<String>) -> Result<(), String> {
    if args.is_empty() {
        return Err("print() requires at least 1 argument".to_string());
    }

    let s = args.remove(0);
    print!("{}", s);
    Ok(())
}

pub fn call_native_by_id(id: u8, args: &mut Vec<String>) -> Result<(), String> {
    match id {
        NATIVE_BENGAL_PRINT => native_bengal_print(args),
        NATIVE_BENGAL_PRINTLN => native_bengal_println(args),
        _ => Err(format!("Unknown native function ID: {}", id)),
    }
}

fn native_bengal_print(args: &mut Vec<String>) -> Result<(), String> {
    if args.is_empty() {
        return Err("bengal_print() requires at least 1 argument".to_string());
    }
    let s = args.remove(0);
    print!("{}", s);
    Ok(())
}

fn native_bengal_println(args: &mut Vec<String>) -> Result<(), String> {
    if args.is_empty() {
        return Err("bengal_println() requires at least 1 argument".to_string());
    }
    let s = args.remove(0);
    println!("{}", s);
    Ok(())
}

#[no_mangle]
pub extern "C" fn bengal_print(s: *const c_char) {
    unsafe {
        if let Ok(c_str) = CStr::from_ptr(s).to_str() {
            print!("{}", c_str);
        }
    }
}

#[no_mangle]
pub extern "C" fn bengal_println(s: *const c_char) {
    unsafe {
        if let Ok(c_str) = CStr::from_ptr(s).to_str() {
            println!("{}", c_str);
        }
    }
}

#[no_mangle]
pub extern "C" fn bengal_init() -> i32 {
    0
}

#[no_mangle]
pub extern "C" fn bengal_exit(code: i32) {
    std::process::exit(code);
}
